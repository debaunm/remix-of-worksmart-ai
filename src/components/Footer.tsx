import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import worksmartLogo from "@/assets/worksmart-logo.png";

const Footer = () => {
  return (
    <footer className="section-dark">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img 
                src={worksmartLogo} 
                alt="WorkSmart" 
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              The career and wealth operating system for modern professionals.
            </p>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold mb-4 text-white">About</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">
                  About WorkSmart
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
            <ul className="space-y-3 text-sm text-white/60">
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
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <Link to="/free-tools" className="hover:text-white transition-colors">
                  Free AI Tools
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:support@worksmartadvisor.com" 
                  className="hover:text-white transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Products</h4>
            <ul className="space-y-3 text-sm text-white/60">
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
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">
                  WorkSmart Pro
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4 md:mb-0">
            <Clock className="w-4 h-4" />
            Support within 24 hours
          </div>
          <p className="text-sm text-white/50">
            © 2026 WorkSmart Advisor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
