import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePurchases } from "@/hooks/usePurchases";
import { useCheckout } from "@/hooks/useCheckout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, BookOpen, ExternalLink, Check, Sparkles, DollarSign, TrendingUp, PiggyBank } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const WealthCodeBook = () => {
  const { user, loading: authLoading } = useAuth();
  const { hasEbookAccess, hasMoneyAccess, isLoading: purchasesLoading } = usePurchases();
  const { checkout, isLoading: checkoutLoading } = useCheckout();
  const navigate = useNavigate();

  const isLoading = authLoading || purchasesLoading;

  const handlePurchaseBook = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    checkout("wealth_code_book");
  };

  const handlePurchaseBundle = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    checkout("money_systems");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Landing page for non-owners
  if (!hasEbookAccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20">
          {/* Hero Section */}
          <section className="px-6 pb-16">
            <div className="container mx-auto max-w-6xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Book Preview */}
                <div className="relative">
                  <div className="aspect-[3/4] max-w-sm mx-auto bg-gradient-to-br from-primary/20 via-primary/10 to-background rounded-2xl border border-border shadow-2xl flex items-center justify-center overflow-hidden">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">The Wealth Code</h3>
                      <p className="text-muted-foreground">Your Blueprint to Financial Independence</p>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                  <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    Digital Ebook
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                    The Wealth Code Book
                  </h1>
                  
                  <p className="text-xl text-muted-foreground">
                    Master your money mindset and build lasting wealth with this comprehensive guide to financial independence.
                  </p>

                  <ul className="space-y-3">
                    {[
                      "Understand the psychology of wealth building",
                      "Create systems for passive income",
                      "Build a personalized financial roadmap",
                      "Learn investment strategies for beginners",
                      "Master budgeting without restriction"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button 
                      variant="hero" 
                      size="lg" 
                      onClick={handlePurchaseBook}
                      disabled={checkoutLoading}
                      className="text-lg"
                    >
                      {checkoutLoading ? "Loading..." : "Buy Now — $5.99"}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      onClick={handlePurchaseBundle}
                      disabled={checkoutLoading}
                    >
                      Get with Money Systems Bundle
                    </Button>
                  </div>

                  {!user && (
                    <p className="text-sm text-muted-foreground">
                      <Link to="/auth" className="text-primary hover:underline">Sign in</Link> or create an account to purchase
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* What's Inside Section */}
          <section className="px-6 py-16 bg-muted/30">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-center text-foreground mb-12">
                What's Inside
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: DollarSign,
                    title: "Money Mindset",
                    description: "Reprogram your relationship with money and remove limiting beliefs holding you back."
                  },
                  {
                    icon: TrendingUp,
                    title: "Wealth Building",
                    description: "Step-by-step strategies to grow your net worth and create multiple income streams."
                  },
                  {
                    icon: PiggyBank,
                    title: "Financial Freedom",
                    description: "Calculate your freedom number and create a realistic plan to achieve it."
                  }
                ].map((feature, i) => (
                  <div key={i} className="text-center">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Bundle CTA */}
          <section className="px-6 py-16">
            <div className="container mx-auto max-w-3xl">
              <div className="bg-card border border-border rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Want the Complete Money Systems Experience?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Get The Wealth Code Book included with the full Money Systems bundle — video workshops, spreadsheets, and more for just $197.
                </p>
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={handlePurchaseBundle}
                  disabled={checkoutLoading}
                >
                  Get the Full Bundle — $197
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Reader view for owners
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