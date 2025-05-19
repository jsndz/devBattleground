function generateTimeSlots() {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    const time = `${hour % 12 === 0 ? 12 : hour % 12}:00 ${
      hour < 12 ? "AM" : "PM"
    }`;
    slots.push({
      time,
      booked: false,
      name: null,
    });
  }
  return slots;
}

const timeSlots = generateTimeSlots();

module.exports = {
  timeSlots,
};
