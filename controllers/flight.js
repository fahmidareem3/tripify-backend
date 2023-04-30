const asyncHandler = require("../middleware/async");
const Flight = require("../models/Flights");

// @desc      Create a flight
// @route     POST /api/flights
// @access    Public
exports.createFlight = asyncHandler(async (req, res, next) => {
  const {
    airline,
    flightNumber,
    origin,
    destination,
    departureDate,
    availableSeats,
    arrivalDate,
    economyPrice,
    businessPrice,
  } = req.body;

  // Create flight
  const flight = await Flight.create({
    airline,
    flightNumber,
    origin,
    destination,
    departureDate,
    availableSeats,
    arrivalDate,
    economyPrice,
    businessPrice,
  });

  res.status(201).json({
    success: true,
    data: flight,
  });
});
