import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X, Crown, Briefcase, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if we're on homepage - only homepage has dark hero
  const isHomepage = location.pathname === "/";
  const useDarkText = scrolled || !isHomepage;

  const navLinkStyles = useDarkText 
    ? "text-foreground hover:text-primary" 
    : "text-white opacity-80 hover:opacity-100";
  const logoTextStyles = useDarkText ? "text-foreground" : "text-white";
  const buttonGhostStyles = useDarkText 
    ? "text-muted-foreground hover:text-foreground hover:bg-secondary" 
    : "text-white/80 hover:text-white hover:bg-white/10";
  const mobileMenuBorderStyles = useDarkText ? "border-border" : "border-white/20";

  const navItems = [
    { label: "Executive Suite", href: "/#all-tools", icon: Crown },
    { label: "Entrepreneur Suite", href: "/#all-tools", icon: Briefcase },
    { label: "Free Tools", href: "/#all-tools", icon: Zap },
    { label: "Pricing", href: "/pricing", icon: null },
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
              WorkSmart<span className="text-primary">.ai</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              item.href.startsWith("/#") ? (
                <a 
                  key={item.label}
                  href={item.href} 
                  className={`transition-colors flex items-center gap-1.5 text-sm ${navLinkStyles}`}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </a>
              ) : (
                <Link 
                  key={item.label}
                  to={item.href} 
                  className={`transition-colors flex items-center gap-1.5 text-sm font-medium ${navLinkStyles}`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className={buttonGhostStyles}>
              Sign In
            </Button>
            <Link to="/pricing">
              <Button variant="hero">Get All Access</Button>
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
                    className={`transition-colors py-2 flex items-center gap-2 ${navLinkStyles}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.label}
                  </a>
                ) : (
                  <Link 
                    key={item.label}
                    to={item.href} 
                    className={`transition-colors py-2 flex items-center gap-2 ${navLinkStyles}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="ghost" className={`w-full ${buttonGhostStyles}`}>
                  Sign In
                </Button>
                <Link to="/pricing" className="w-full">
                  <Button variant="hero" className="w-full">Get All Access</Button>
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