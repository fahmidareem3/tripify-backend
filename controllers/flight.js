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

// @desc      Search flights
// @route     GET /api/flights/search
// @access    Public
exports.searchFlights = asyncHandler(async (req, res, next) => {
  const {
    origin,
    destination,
    departureDate,
    arrivalDate,
    classType,
    passengers,
  } = req.query;

  // Find flights matching the search criteria
  const flights = await Flight.find({
    origin: origin,
    destination: destination,
    departureDate: departureDate,
    ...(arrivalDate && { arrivalDate: arrivalDate }), // optional arrivalDate
    availableSeats: { $gte: passengers }, // check if availableSeats >= passengers
  });

  // Filter flights based on classType
  const filteredFlights = flights.map((flight) => {
    let price = null;
    if (classType === "business") {
      price = flight.businessPrice;
    } else {
      price = flight.economyPrice;
    }
    return {
      _id: flight._id, // include the _id field
      airline: flight.airline,
      flightNumber: flight.flightNumber,
      origin: flight.origin,
      destination: flight.destination,
      departureDate: flight.departureDate,
      arrivalDate: flight.arrivalDate,
      availableSeats: flight.availableSeats,
      price: price,
    };
  });

  res.status(200).json({
    success: true,
    data: filteredFlights,
  });
});
