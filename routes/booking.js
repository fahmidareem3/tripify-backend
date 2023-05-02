const express = require("express");
const {
  createBooking,
  getBookingsByUser,
  getInvoiceByUser,
} = require("../controllers/booking");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.route("/create").post(protect, createBooking);
router.route("/findbyuser").get(protect, getBookingsByUser);
router.route("/findinvoicebyuser").get(protect, getInvoiceByUser);
module.exports = router;
