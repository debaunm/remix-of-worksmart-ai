import { Sparkles, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="section-dark">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-white">Worksmart</span>
            </Link>
            <p className="text-sm text-white/50 mb-4">
              The Tech and accountability operating system for modern professionals and founders.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4 text-white">About</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">
                  About Worksmart
                </Link>
              </li>
              <li>
                <a
                  href="https://www.amazon.com/Rewrite-Your-Rules-Achieve-Freedom/dp/0593725050/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Get the Book
                </a>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Account</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>
                <Link to="/settings" className="hover:text-white transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>
                <Link to="/prompts" className="hover:text-white transition-colors">
                  Prompt Library
                </Link>
              </li>
              <li>
              <Link to="/tools/early-retirement-calculator" className="hover:text-white transition-colors">
                  Early Retirement Calculator
                </Link>
              </li>
              <li>
                <Link to="/tools/budget-builder-prompts" className="hover:text-white transition-colors">
                  Budget Builder Prompts
                </Link>
              </li>
              <li>
                <Link to="/tools/linkedin-21-day-content-plan" className="hover:text-white transition-colors">
                  Content Pipeline Planning
                </Link>
              </li>
              <li>
                <Link to="/tools/weekly-plan-builder" className="hover:text-white transition-colors">
                  Weekly Planning System
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Products</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>
                <Link to="/money-systems" className="hover:text-white transition-colors">
                  Money Systems
                </Link>
              </li>
              <li>
                <Link to="/work-systems" className="hover:text-white transition-colors">
                  Work Systems
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust banner */}
        <div className="flex flex-wrap items-center justify-center gap-6 py-6 border-t border-b border-white/10 mb-8">
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Shield className="w-4 h-4 text-primary" />
            Money-back guarantee
          </div>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Clock className="w-4 h-4 text-primary" />
            Support within 24 hours
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-white/50 mb-4 md:mb-0">
            © 2025 Worksmart Advisor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;