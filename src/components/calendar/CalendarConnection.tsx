import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, Loader2, Unplug } from "lucide-react";

interface CalendarConnectionProps {
  isConnected: boolean;
  isLoading: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

const CalendarConnection = ({
  isConnected,
  isLoading,
  onConnect,
  onDisconnect,
}: CalendarConnectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border p-4 ${
        isConnected
          ? "bg-accent/10 border-accent/30"
          : "bg-card border-border/50"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {isConnected ? (
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-accent" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Calendar className="w-5 h-5 text-muted-foreground" />
            </div>
          )}
          <div>
            <h4 className="font-semibold text-sm">
              {isConnected ? "Connected to Google Calendar" : "Calendar Not Connected"}
            </h4>
            <p className="text-xs text-muted-foreground">
              {isConnected
                ? "Your events are syncing automatically"
                : "Connect to see your upcoming events"}
            </p>
          </div>
        </div>

        {isConnected ? (
          <Button
            variant="outline"
            size="sm"
            onClick={onDisconnect}
            disabled={isLoading}
            className="text-muted-foreground hover:text-destructive hover:border-destructive"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Unplug className="w-4 h-4 mr-1" />
                Disconnect
              </>
            )}
          </Button>
        ) : (
          <Button onClick={onConnect} disabled={isLoading} size="sm">
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <svg
                  className="w-4 h-4 mr-2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Connect Google Calendar
              </>
            )}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default CalendarConnection;
