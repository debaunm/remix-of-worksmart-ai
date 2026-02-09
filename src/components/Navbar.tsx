import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import worksmartLogo from "@/assets/worksmart-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const { toast } = useToast();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You've been signed out successfully.",
      });
      navigate("/");
    }
  };
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Escape key to close mobile menu
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape" && isOpen) {
      setIsOpen(false);
      menuButtonRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      const firstFocusable = mobileMenuRef.current?.querySelector<HTMLElement>(
        'a, button'
      );
      firstFocusable?.focus();
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  const navItems = [
    { label: "Money Systems", href: "/money-systems" },
    { label: "Work Systems", href: "/work-systems" },
    { label: "Community", href: "https://www.patreon.com/MorganDeBaun", external: true },
    { label: "Dashboard", href: "/dashboard" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-border shadow-sm" 
          : "bg-white"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Left */}
          <Link 
            to="/" 
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
            aria-label="WorkSmart - Go to homepage"
          >
            <img 
              src={worksmartLogo} 
              alt="worksmart" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Nav - Center */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navItems.map((item) => (
              item.external ? (
                <a 
                  key={item.label}
                  href={item.href} 
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded px-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              ) : (
                <Link 
                  key={item.label}
                  to={item.href} 
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded px-1"
                  aria-current={location.pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Right side - Sign In + Get Started */}
          <div className="hidden md:flex items-center gap-4" role="group" aria-label="Account actions">
            {!loading && (
              <>
                {user ? (
                  <Button 
                    variant="ghost" 
                    className="text-muted-foreground hover:text-foreground"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" aria-hidden="true" />
                    Sign Out
                  </Button>
                ) : (
                  <Link to="/auth">
                    <Button variant="ghost" className="text-muted-foreground hover:text-foreground font-medium">
                      Sign In
                    </Button>
                  </Link>
                )}
              </>
            )}
            <Link to="/auth">
              <Button className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg px-6">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            ref={menuButtonRef}
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pt-6 pb-4 border-t border-border mt-4"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
              {navItems.map((item) => (
                item.external ? (
                  <a 
                    key={item.label}
                    href={item.href} 
                    className="text-foreground hover:text-primary transition-colors py-2 px-2 font-medium"
                    onClick={() => setIsOpen(false)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link 
                    key={item.label}
                    to={item.href} 
                    className="text-foreground hover:text-primary transition-colors py-2 px-2 font-medium"
                    onClick={() => setIsOpen(false)}
                    aria-current={location.pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              
              <div className="flex flex-col gap-2 pt-4 border-t border-border" role="group" aria-label="Account actions">
                {!loading && (
                  <>
                    {user ? (
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-muted-foreground"
                        onClick={() => {
                          handleSignOut();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" aria-hidden="true" />
                        Sign Out
                      </Button>
                    ) : (
                      <Link to="/auth" className="w-full" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                          Sign In
                        </Button>
                      </Link>
                    )}
                  </>
                )}
                <Link to="/auth" className="w-full" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
