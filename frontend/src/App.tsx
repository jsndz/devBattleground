import React, { useState, useEffect } from "react";
import { fetchTimeSlots, bookTimeSlot, cancelBooking } from "./services/api";
import { TimeSlot as TimeSlotType } from "./types";
import { TimeSlotGrid } from "./components/TimeSlotGrid";
import { Header } from "./components/Header";
import { Notification, NotificationType } from "./components/Notification";
import { EmptyState } from "./components/EmptyState";
import { motion } from "framer-motion";
import { LoginPage } from "./components/Login";

function App() {
  const [slots, setSlots] = useState<TimeSlotType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: NotificationType;
    message: string;
  } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const fetchSlots = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTimeSlots();
      setSlots(data);
    } catch (err) {
      console.error("Error fetching time slots:", err);
      setError("Failed to load time slots. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSlots();
    }
  }, [isAuthenticated]);

  const handleBook = async (name: string, time: string) => {
    try {
      const updatedSlots = await bookTimeSlot({ name, time });
      setSlots(updatedSlots);
      setNotification({
        type: "success",
        message: `Successfully booked ${time} for ${name}!`,
      });
    } catch (err) {
      console.error("Error booking slot:", err);
      setNotification({
        type: "error",
        message:
          err instanceof Error ? err.message : "Failed to book time slot",
      });
    }
  };

  const handleCancel = async (time: string) => {
    try {
      const updatedSlots = await cancelBooking({ time });
      setSlots(updatedSlots);
      setNotification({
        type: "success",
        message: `Successfully cancelled booking for ${time}!`,
      });
    } catch (err) {
      console.error("Error cancelling booking:", err);
      setNotification({
        type: "error",
        message:
          err instanceof Error ? err.message : "Failed to cancel booking",
      });
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Available Sessions
            </h2>
            <p className="text-gray-600 mb-6">
              Select an available time slot to book your session. You can cancel
              your booking at any time.
            </p>

            {error ? (
              <EmptyState message={error} onRefresh={fetchSlots} />
            ) : (
              <TimeSlotGrid
                slots={slots}
                onBook={handleBook}
                onCancel={handleCancel}
                isLoading={isLoading}
              />
            )}
          </div>
        </motion.div>
      </main>

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default App;
