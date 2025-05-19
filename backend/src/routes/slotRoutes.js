const express = require("express");
const {
  getAllSlots,
  bookSlot,
  cancelBooking,
} = require("../controllers/slotController");

const router = express.Router();

router.get("/slots", getAllSlots);
router.post("/book", bookSlot);
router.post("/cancel", cancelBooking);

module.exports = router;
