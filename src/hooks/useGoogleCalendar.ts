import { useState, useCallback } from "react";
import { mockCalendarEvents, CalendarEvent } from "@/components/calendar/mockCalendarData";

interface UseGoogleCalendarReturn {
  isConnected: boolean;
  isLoading: boolean;
  events: CalendarEvent[];
  connect: () => void;
  disconnect: () => void;
  refetch: () => void;
  setMockConnected: (connected: boolean) => void; // For design preview toggle
}

export const useGoogleCalendar = (): UseGoogleCalendarReturn => {
  const [isConnected, setIsConnected] = useState(true); // Start connected for preview
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>(mockCalendarEvents);

  const connect = useCallback(() => {
    setIsLoading(true);
    // Simulate connection delay
    setTimeout(() => {
      setIsConnected(true);
      setEvents(mockCalendarEvents);
      setIsLoading(false);
    }, 1000);
  }, []);

  const disconnect = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsConnected(false);
      setEvents([]);
      setIsLoading(false);
    }, 500);
  }, []);

  const refetch = useCallback(() => {
    if (!isConnected) return;
    setIsLoading(true);
    setTimeout(() => {
      setEvents(mockCalendarEvents);
      setIsLoading(false);
    }, 500);
  }, [isConnected]);

  const setMockConnected = useCallback((connected: boolean) => {
    setIsConnected(connected);
    setEvents(connected ? mockCalendarEvents : []);
  }, []);

  return {
    isConnected,
    isLoading,
    events,
    connect,
    disconnect,
    refetch,
    setMockConnected,
  };
};
