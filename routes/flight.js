const express = require("express");
const {
  createFlight,
  searchFlights,
  getFlightById,
} = require("../controllers/flight");

const router = express.Router();

router.post("/create", createFlight);
router.get("/search", searchFlights);
router.get("/search/:id", getFlightById);

module.exports = router;
