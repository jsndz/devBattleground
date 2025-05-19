import { BookingPayload, CancelPayload, TimeSlot } from "../types";

// Simulate API storage with in-memory data
let timeSlots: TimeSlot[] = [
  { time: "10:00 AM", isBooked: false, bookedBy: null },
  { time: "11:00 AM", isBooked: false, bookedBy: null },
  { time: "12:00 PM", isBooked: false, bookedBy: null },
  { time: "1:00 PM", isBooked: false, bookedBy: null },
  { time: "2:00 PM", isBooked: false, bookedBy: null },
  { time: "3:00 PM", isBooked: false, bookedBy: null },
  { time: "4:00 PM", isBooked: false, bookedBy: null },
];

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// GET /slots - Retrieve all time slots
export const fetchTimeSlots = async (): Promise<TimeSlot[]> => {
  await delay(500); // Simulate network delay
  return [...timeSlots];
};

// POST /book - Book a slot
export const bookTimeSlot = async (
  payload: BookingPayload
): Promise<TimeSlot[]> => {
  await delay(800); // Simulate network delay

  const { name, time } = payload;

  // Check if slot is already booked
  const slotIndex = timeSlots.findIndex((slot) => slot.time === time);

  if (slotIndex === -1) {
    throw new Error("Time slot not found");
  }

  if (timeSlots[slotIndex].isBooked) {
    throw new Error("This time slot is already booked");
  }

  // Update the slot
  timeSlots[slotIndex] = {
    ...timeSlots[slotIndex],
    isBooked: true,
    bookedBy: name,
  };

  return [...timeSlots];
};

// POST /cancel - Cancel a booking
export const cancelBooking = async (
  payload: CancelPayload
): Promise<TimeSlot[]> => {
  await delay(800); // Simulate network delay

  const { time } = payload;

  // Find the slot
  const slotIndex = timeSlots.findIndex((slot) => slot.time === time);

  if (slotIndex === -1) {
    throw new Error("Time slot not found");
  }

  if (!timeSlots[slotIndex].isBooked) {
    throw new Error("This time slot is not booked");
  }

  // Update the slot
  timeSlots[slotIndex] = {
    ...timeSlots[slotIndex],
    isBooked: false,
    bookedBy: null,
  };

  return [...timeSlots];
};
