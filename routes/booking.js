const express = require("express");
const {
  createBooking,
  getBookingsByUser,
  getBookingById,
} = require("../controllers/booking");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.route("/create").post(protect, createBooking);
router.route("/findbyuser").get(protect, getBookingsByUser);
router.route("/search/:id").get(protect, getBookingById);

module.exports = router;
