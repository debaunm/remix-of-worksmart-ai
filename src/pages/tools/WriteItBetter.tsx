import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Copy, Check, Sparkles, Zap, Target, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

type OutputType = "clearer" | "shorter" | "confident";

const WriteItBetter = () => {
  const [input, setInput] = useState("");
  const [outputs, setOutputs] = useState<Record<OutputType, string>>({
    clearer: "",
    shorter: "",
    confident: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<OutputType>("clearer");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleProcess = async () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter some text to improve.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Demo outputs - in production, these would come from the AI
    const demoOutputs: Record<OutputType, string> = {
      clearer: `${input.split('.')[0]}. Here's what I mean:\n\n• The main point is straightforward\n• Each idea connects logically\n• No unnecessary jargon\n\nThis version prioritizes clarity above all else.`,
      shorter: input
        .split(' ')
        .filter((_, i) => i % 2 === 0 || i < 10)
        .join(' ')
        .substring(0, 200) + '...',
      confident: `I'm confident that ${input.toLowerCase().replace(/i think|maybe|perhaps|possibly/gi, '').trim()} This is the direction we're taking.`,
    };

    setOutputs(demoOutputs);
    setIsProcessing(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(outputs[activeTab]);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs: { id: OutputType; label: string; icon: React.ElementType; description: string }[] = [
    { id: "clearer", label: "Clearer", icon: Target, description: "Simplified language, better structure" },
    { id: "shorter", label: "Shorter", icon: Zap, description: "Concise and to the point" },
    { id: "confident", label: "More Confident", icon: MessageSquare, description: "Assertive, decisive tone" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-28 pb-20">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm mb-6">
              <span className="text-xs font-medium text-primary uppercase tracking-wider">Professional</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Write It <span className="gradient-text">Better</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform any message into clearer, shorter, or more confident versions instantly. Perfect for emails, Slack messages, and memos.
            </p>
          </motion.div>

          {/* Tool Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            {/* Input Section */}
            <div className="rounded-2xl bg-card border border-border/50 p-6">
              <label className="block text-sm font-medium mb-3">
                Paste your text
              </label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste any written message here - an email, memo, Slack message, or any text you want to improve..."
                className="min-h-[200px] resize-none bg-secondary/50 border-border/50 focus:border-primary/50"
              />
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-muted-foreground">
                  {input.length} characters
                </span>
                <Button
                  onClick={handleProcess}
                  disabled={isProcessing || !input.trim()}
                  variant="hero"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Sparkles className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Improve Text
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Output Section */}
            {(outputs.clearer || isProcessing) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-card border border-border/50 overflow-hidden"
              >
                {/* Tabs */}
                <div className="flex border-b border-border/50">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-4 px-6 text-sm font-medium transition-colors relative ${
                        activeTab === tab.id
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                      </div>
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    {tabs.find((t) => t.id === activeTab)?.description}
                  </p>
                  
                  {isProcessing ? (
                    <div className="min-h-[150px] flex items-center justify-center">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Sparkles className="w-5 h-5 animate-spin text-primary" />
                        <span>Improving your text...</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="min-h-[150px] p-4 rounded-xl bg-secondary/30 border border-border/30 whitespace-pre-wrap">
                        {outputs[activeTab]}
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button
                          onClick={handleCopy}
                          variant="outline"
                          size="sm"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copy to clipboard
                            </>
                          )}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 p-6 rounded-2xl bg-secondary/30 border border-border/30"
          >
            <h3 className="font-semibold mb-3">💡 Tips for best results</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Include the full context of your message for better improvements</li>
              <li>• Try all three versions to find the best fit for your audience</li>
              <li>• Use "Clearer" for complex topics, "Shorter" for busy recipients</li>
              <li>• "More Confident" works great for proposals and presentations</li>
            </ul>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default WriteItBetter;
