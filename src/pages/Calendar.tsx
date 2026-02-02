import { motion } from "framer-motion";
import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import CalendarConnection from "@/components/calendar/CalendarConnection";
import UpcomingEvents from "@/components/calendar/UpcomingEvents";
import { useGoogleCalendar } from "@/hooks/useGoogleCalendar";

const Calendar = () => {
  const {
    isConnected,
    isLoading,
    events,
    connect,
    disconnect,
    setMockConnected,
  } = useGoogleCalendar();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-6 pt-28 pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm mb-6">
              <CalendarIcon className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">
                Calendar Sync
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your <span className="gradient-text">Upcoming Events</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              View your calendar at a glance and plan your week with full context.
            </p>
          </motion.div>

          {/* Preview Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-3 mb-8 p-3 rounded-xl bg-muted/50 border border-border/30"
          >
            <Label htmlFor="preview-toggle" className="text-sm text-muted-foreground">
              Preview Mode:
            </Label>
            <div className="flex items-center gap-2">
              <span className={`text-sm ${!isConnected ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                Disconnected
              </span>
              <Switch
                id="preview-toggle"
                checked={isConnected}
                onCheckedChange={setMockConnected}
              />
              <span className={`text-sm ${isConnected ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                Connected
              </span>
            </div>
          </motion.div>

          {/* Connection Status */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8"
          >
            <CalendarConnection
              isConnected={isConnected}
              isLoading={isLoading}
              onConnect={connect}
              onDisconnect={disconnect}
            />
          </motion.div>

          {/* Events List */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-card border border-border/50 p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <CalendarIcon className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Next 7 Days</h3>
            </div>

            {isConnected ? (
              <UpcomingEvents events={events} maxDays={7} />
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <CalendarIcon className="w-8 h-8 text-muted-foreground" />
                </div>
                <h4 className="font-semibold mb-2">Connect Your Calendar</h4>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  Link your Google Calendar to see all your upcoming events and plan your week
                  with full visibility.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;
