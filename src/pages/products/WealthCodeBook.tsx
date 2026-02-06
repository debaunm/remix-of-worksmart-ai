import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePurchases } from "@/hooks/usePurchases";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, BookOpen, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const WealthCodeBook = () => {
  const { user, loading: authLoading } = useAuth();
  const { hasEbookAccess, isLoading: purchasesLoading } = usePurchases();
  const navigate = useNavigate();

  const isLoading = authLoading || purchasesLoading;

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!hasEbookAccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-20 px-6">
          <div className="container mx-auto max-w-2xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Access Required
            </h1>
            <p className="text-muted-foreground mb-8">
              You need to purchase The Wealth Code Book or the Money Systems bundle to access this content.
            </p>
            <Link to="/money-systems">
              <Button variant="hero" size="lg">
                Get Access
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">The Wealth Code Book</h1>
                  <p className="text-sm text-muted-foreground">Your Blueprint to Financial Independence</p>
                </div>
              </div>
              <a 
                href="/ebooks/wealth-code-book.html" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in New Tab
                </Button>
              </a>
            </div>
            
            <iframe
              src="/ebooks/wealth-code-book.html"
              className="w-full h-[80vh] border-0"
              title="The Wealth Code Book"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WealthCodeBook;