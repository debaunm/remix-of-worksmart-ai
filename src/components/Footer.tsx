import { Sparkles, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer>
      {/* CTA Section - Primary Green */}
      <div className="bg-primary py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
              Empowering Your Professional Growth
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Join thousands of professionals using AI to save time and do better work.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 border-white font-semibold"
              >
                Start Using Free Tools
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links - Dark */}
      <div className="dark-section bg-[hsl(160,24%,8%)]">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <a href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-white">Worksmart Advisor</span>
              </a>
              <p className="text-sm text-white/50">
                The AI Tools Vault for professionals who want results without complexity.
              </p>
            </div>

            {/* Tools */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Tools</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-white transition-colors">For Founders</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Executives</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Productivity</a></li>
                <li><a href="#" className="hover:text-white transition-colors">All Tools</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
            <p className="text-sm text-white/50 mb-4 md:mb-0">
              © 2024 Worksmart Advisor. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
