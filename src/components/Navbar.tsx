import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const { toast } = useToast();

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
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomepage = location.pathname === "/";
  const useDarkText = scrolled || !isHomepage;

  const navLinkStyles = useDarkText 
    ? "text-foreground hover:text-primary" 
    : "text-foreground hover:text-primary";
  const logoTextStyles = useDarkText ? "text-foreground" : "text-foreground";
  const buttonGhostStyles = useDarkText 
    ? "text-muted-foreground hover:text-foreground hover:bg-secondary" 
    : "text-muted-foreground hover:text-foreground hover:bg-secondary";
  const mobileMenuBorderStyles = "border-border";

  const navItems = [
    { label: "Money Systems", href: "/money-systems" },
    { label: "Work Systems", href: "/work-systems" },
    { label: "Sessions", href: "/sessions" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHomepage
          ? "bg-background/95 backdrop-blur-xl border-b border-border" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <span className={`text-xl font-bold transition-colors ${logoTextStyles}`}>
              Worksmart <span className="text-primary">Advisor</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              item.href.startsWith("/#") ? (
                <a 
                  key={item.label}
                  href={item.href} 
                  className={`transition-colors text-sm ${navLinkStyles}`}
                >
                  {item.label}
                </a>
              ) : (
                <Link 
                  key={item.label}
                  to={item.href} 
                  className={`transition-colors text-sm font-medium ${navLinkStyles}`}
                >
                  {item.label}
                </Link>
              )
            ))}
            
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link to="/dashboard">
                      <Button variant="ghost" className={buttonGhostStyles}>
                        Dashboard
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      className={buttonGhostStyles}
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Link to="/auth">
                    <Button variant="ghost" className={buttonGhostStyles}>
                      Sign In
                    </Button>
                  </Link>
                )}
              </>
            )}
            <Link to="/pricing">
              <Button variant="hero">View Pricing</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`md:hidden p-2 transition-colors ${navLinkStyles}`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`md:hidden pt-6 pb-4 border-t ${mobileMenuBorderStyles} mt-4`}
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                item.href.startsWith("/#") ? (
                  <a 
                    key={item.label}
                    href={item.href} 
                    className={`transition-colors py-2 ${navLinkStyles}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link 
                    key={item.label}
                    to={item.href} 
                    className={`transition-colors py-2 ${navLinkStyles}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              
              
              <div className="flex flex-col gap-2 pt-4">
                {!loading && (
                  <>
                    {user ? (
                      <>
                        <Link to="/dashboard" className="w-full" onClick={() => setIsOpen(false)}>
                          <Button variant="ghost" className={`w-full ${buttonGhostStyles}`}>
                            Dashboard
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          className={`w-full ${buttonGhostStyles}`}
                          onClick={() => {
                            handleSignOut();
                            setIsOpen(false);
                          }}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <Link to="/auth" className="w-full" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className={`w-full ${buttonGhostStyles}`}>
                          Sign In
                        </Button>
                      </Link>
                    )}
                  </>
                )}
                <Link to="/pricing" className="w-full" onClick={() => setIsOpen(false)}>
                  <Button variant="hero" className="w-full">View Pricing</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;