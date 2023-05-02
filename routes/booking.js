const express = require("express");
const { createBooking, getBookingsByUser } = require("../controllers/booking");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.route("/create").post(protect, createBooking);
router.route("/findbyuser").get(protect, getBookingsByUser);
module.exports = router;
