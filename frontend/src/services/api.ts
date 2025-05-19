import axios from "axios";
import { BookingPayload, CancelPayload, TimeSlot } from "../types";

const API_URL = "http://localhost:3000";

export const fetchTimeSlots = async (): Promise<TimeSlot[]> => {
  try {
    const response = await axios.get(`${API_URL}/slots`);
    console.log("Res 23:", response.data);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch time slots:", error);
    throw error;
  }
};

export const bookTimeSlot = async (
  payload: BookingPayload
): Promise<TimeSlot[]> => {
  try {
    const response = await axios.post(`${API_URL}/book`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Res 23:", response.data.slot);

    return response.data.slot;
  } catch (error: any) {
    console.error("Failed to book the time slot:", error.response.data.message);
    throw new Error(error.response.data.message || "Booking failed");
  }
};

export const cancelBooking = async (
  payload: CancelPayload
): Promise<TimeSlot[]> => {
  try {
    const response = await axios.post(`${API_URL}/cancel`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Cancellation response:", response.data);

    return response.data;
  } catch (error: any) {
    console.error(
      "Failed to cancel the time slot:",
      error.response.data.message
    );
    throw new Error(error.response.data.message || "Cancellation failed");
  }
};
