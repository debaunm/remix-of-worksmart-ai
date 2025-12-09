import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const textColor = scrolled ? "text-foreground" : "text-white";
  const textMutedColor = scrolled ? "text-muted-foreground" : "text-white/70";
  const hoverColor = scrolled ? "hover:text-foreground" : "hover:text-white";
  const bgHover = scrolled ? "hover:bg-secondary" : "hover:bg-white/10";
  
  return <motion.nav initial={{
    y: -20,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    duration: 0.5
  }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-xl border-b border-border" : "bg-transparent"}`}>
      <div className={`container mx-auto px-6 py-4 ${scrolled ? "" : "bg-transparent"}`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <span className={`text-xl font-bold ${textColor} transition-colors`}>
              WorkSmart<span className="text-primary">.ai</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#tools" className={`${textMutedColor} ${hoverColor} transition-colors`}>
              Tools
            </a>
            <a href="#features" className={`${textMutedColor} ${hoverColor} transition-colors`}>
              Features
            </a>
            <a href="#pricing" className={`${textMutedColor} ${hoverColor} transition-colors`}>
              Pricing
            </a>
            <a href="#resources" className={`${textMutedColor} ${hoverColor} transition-colors`}>
              Resources
            </a>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className={`${textMutedColor} ${hoverColor} ${bgHover}`}>
              Sign In
            </Button>
            <Button variant="hero">Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden p-2 ${textMutedColor} ${hoverColor}`}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && <motion.div initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} className={`md:hidden pt-6 pb-4 border-t ${scrolled ? "border-border" : "border-white/10"} mt-4`}>
            <div className="flex flex-col gap-4">
              <a href="#tools" className={`${textMutedColor} ${hoverColor} transition-colors py-2`}>
                Tools
              </a>
              <a href="#features" className={`${textMutedColor} ${hoverColor} transition-colors py-2`}>
                Features
              </a>
              <a href="#pricing" className={`${textMutedColor} ${hoverColor} transition-colors py-2`}>
                Pricing
              </a>
              <a href="#resources" className={`${textMutedColor} ${hoverColor} transition-colors py-2`}>
                Resources
              </a>
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="ghost" className={`w-full ${textMutedColor} ${hoverColor} ${bgHover}`}>
                  Sign In
                </Button>
                <Button variant="hero" className="w-full">Get Started</Button>
              </div>
            </div>
          </motion.div>}
      </div>
    </motion.nav>;
};
export default Navbar;