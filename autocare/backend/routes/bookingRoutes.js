const express = require("express");
const router = express.Router();

const {
  bookService,
  getMyBookings,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");

const authMiddleware = require("../middleware/authMiddleware");

// Book Service
router.post("/book", authMiddleware, bookService);

// Get My Bookings
router.get("/my-bookings", authMiddleware, getMyBookings);
router.delete("/cancel/:id", authMiddleware, cancelBooking);
// Get All Bookings
router.get("/", authMiddleware, getAllBookings);
// Update Booking Status
router.put("/status/:id", authMiddleware, updateBookingStatus);

module.exports = router;