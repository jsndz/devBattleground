export interface TimeSlot {
  time: string;
  isBooked: boolean;
  bookedBy: string | null;
}

export interface BookingPayload {
  name: string;
  time: string;
}

export interface CancelPayload {
  time: string;
}