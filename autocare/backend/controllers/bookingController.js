const Booking = require("../models/Booking");

// ==========================
// Book Service
// ==========================
const bookService = async (req, res) => {
  try {
    const {
      serviceId,
      bookingDate,
      bookingTime,
      vehicleNumber,
      note,
    } = req.body;

    // Check required fields
    if (
      !serviceId ||
      !bookingDate ||
      !bookingTime ||
      !vehicleNumber
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Create Booking
    const booking = await Booking.create({
      user: req.user.id,
      service: serviceId,
      bookingDate,
      bookingTime,
      vehicleNumber,
      note,
    });

    res.status(201).json({
      success: true,
      message: "Booking Created Successfully",
      booking,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get My Bookings
// ==========================
const getMyBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate("service")
      .populate("user", "name email");

    res.status(200).json({
      success: true,
      bookings,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================
// Cancel Booking
// ==========================
const cancelBooking = async (req, res) => {
  try {

    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Booking Cancelled Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================
// Get All Bookings (Admin)
// ==========================
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("service");

    res.status(200).json({
      success: true,
      bookings,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================
// Update Booking Status
// ==========================
const updateBookingStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.status = status;

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking Status Updated Successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  bookService,
  getMyBookings,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
};