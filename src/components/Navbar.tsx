import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Menu, X, ChevronDown, BookOpen, FileText, GraduationCap, Search, ShoppingCart } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
  ];

  const resourceItems = [
    { label: "Prompt Library", href: "/prompts", icon: FileText, description: "Copy-paste AI prompts" },
    { label: "AI Accelerator", href: "/courses/ai-accelerator", icon: GraduationCap, description: "Master AI workflows" },
    { label: "ChatGPT 101", href: "/courses/chatgpt-101", icon: BookOpen, description: "Beginner friendly" },
    { label: "1 Person Media Company", href: "/courses/media-company", icon: Sparkles, description: "Build your content empire" },
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
            
            {/* Resources Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className={`flex items-center gap-1 transition-colors text-sm font-medium ${navLinkStyles}`}
              >
                Resources
                <ChevronDown className={`w-4 h-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {resourcesOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-background border border-border rounded-lg shadow-lg z-50 py-2">
                  {resourceItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-muted transition-colors"
                        onClick={() => setResourcesOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-foreground">{item.label}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
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
              
              {/* Resources Section */}
              <div className="pt-2 border-t border-border/50">
                <span className={`text-xs font-semibold uppercase tracking-wider ${useDarkText ? 'text-muted-foreground' : 'text-white/60'}`}>
                  Resources
                </span>
                <div className="mt-2 space-y-1">
                  {resourceItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className={`block py-2 transition-colors ${navLinkStyles}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              
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