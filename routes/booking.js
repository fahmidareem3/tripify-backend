const express = require("express");
const {
  createBooking,
  getBookingsByUser,
  getInvoiceByUser,
  getBookingById,
} = require("../controllers/booking");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.route("/create").post(protect, createBooking);
router.route("/findbyuser").get(protect, getBookingsByUser);
router.route("/findinvoicebyuser").get(protect, getInvoiceByUser);
router.get("/search/:id", getBookingById);

module.exports = router;
