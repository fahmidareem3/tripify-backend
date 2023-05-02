const express = require("express");
const { createBooking } = require("../controllers/booking");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.route("/create").post(protect, createBooking);

module.exports = router;
