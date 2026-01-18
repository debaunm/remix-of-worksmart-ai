import { Sparkles, Twitter, Linkedin, Mail, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return <footer className="section-dark">
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
            <p className="text-sm text-white/50 mb-4">The Tech and accountability operating system for modern professionals and founders.</p>
            <div className="flex items-center gap-3">
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4 text-white">About</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">About Worksmart</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Account</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link to="/settings" className="hover:text-white transition-colors">Profile</Link></li>
              
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link to="/prompts" className="hover:text-white transition-colors">Prompt Library</Link></li>
              <li><Link to="/tools/early-retirement-calculator" className="hover:text-white transition-colors">Cash Flow Projection Guide</Link></li>
              <li><Link to="/tools/budget-builder-prompts" className="hover:text-white transition-colors">Budget Builder Prompts</Link></li>
              <li><Link to="/tools/linkedin-21-day-content-plan" className="hover:text-white transition-colors">Content Pipeline Planning</Link></li>
              <li><Link to="/tools/weekly-plan-builder" className="hover:text-white transition-colors">Weekly Planning System</Link></li>
            </ul>
          </div>

          {/* Sessions */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Sessions</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link to="/sessions/ai-foundations" className="hover:text-white transition-colors">AI Foundations</Link></li>
              <li><Link to="/sessions/ai-content-systems" className="hover:text-white transition-colors">AI Content Systems</Link></li>
              <li><Link to="/sessions/automation-zapier" className="hover:text-white transition-colors">Automation with Zapier</Link></li>
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
            © 2024 Worksmart Advisor. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;