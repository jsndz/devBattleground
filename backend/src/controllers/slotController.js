const { timeSlots } = require("../data");

const getAllSlots = (req, res) => {
  res.status(200).json(timeSlots);
};

const bookSlot = (req, res) => {
  const { name, time } = req.body;

  if (!name || !time) {
    return res.status(400).json({
      success: false,
      error: "Name and time are required",
    });
  }

  const slotIndex = timeSlots.findIndex((slot) => slot.time === time);

  if (slotIndex === -1) {
    return res.status(404).json({
      success: false,
      error: "Time slot not found",
    });
  }

  if (timeSlots[slotIndex].booked) {
    return res.status(400).json({
      success: false,
      error: "This slot is already booked",
    });
  }

  timeSlots[slotIndex].booked = true;
  timeSlots[slotIndex].name = name;

  res.status(200).json({
    success: true,
    message: "Slot booked successfully",
    slot: timeSlots,
  });
};

const cancelBooking = (req, res) => {
  const { time } = req.body;

  if (!time) {
    return res.status(400).json({
      success: false,
      error: "Time is required",
    });
  }

  const slotIndex = timeSlots.findIndex((slot) => slot.time === time);

  if (slotIndex === -1) {
    return res.status(404).json({
      success: false,
      error: "Time slot not found",
    });
  }

  if (!timeSlots[slotIndex].booked) {
    return res.status(400).json({
      success: false,
      error: "This slot is not booked",
    });
  }

  timeSlots[slotIndex].booked = false;
  timeSlots[slotIndex].name = null;

  res.status(200).json({
    success: true,
    message: "Booking canceled successfully",
    slot: timeSlots[slotIndex],
  });
};

module.exports = {
  getAllSlots,
  bookSlot,
  cancelBooking,
};
