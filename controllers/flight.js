const asyncHandler = require("../middleware/async");
const Flight = require("../models/Flights");

// @desc      Create a flight
// @route     POST /api/flights/create
// @access    Public
exports.createFlight = asyncHandler(async (req, res, next) => {
  const {
    airline,
    flightNumber,
    origin,
    destination,
    departureDate,
    availableSeats,
    returnDate,
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
    returnDate,
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
  const { origin, destination, departureDate, classType, passengers } =
    req.query;
  let flights;

  if (req.query.returnDate) {
    const returnDate = req.query.returnDate;
    flights = await Flight.find({
      origin: origin,
      destination: destination,
      $expr: {
        $eq: [
          { $dateToString: { format: "%Y-%m-%d", date: "$departureDate" } },
          departureDate,
        ],
      },
      $expr: {
        $eq: [
          { $dateToString: { format: "%Y-%m-%d", date: "$returnDate" } },
          returnDate,
        ],
      },
      availableSeats: { $gte: passengers }, // check if availableSeats >= passengers
    });
  } else {
    flights = await Flight.find({
      origin: origin,
      destination: destination,
      $expr: {
        $eq: [
          { $dateToString: { format: "%Y-%m-%d", date: "$departureDate" } },
          departureDate,
        ],
      },
      returnDate: null,
      availableSeats: { $gte: passengers }, // check if availableSeats >= passengers
    });
  }

  // Filter flights based on classType
  const filteredFlights = flights.map((flight) => {
    let price = null;
    if (classType === "business") {
      price = flight.businessPrice;
    } else {
      price = flight.economyPrice;
    }

    if (flight.returnDate) {
      return {
        _id: flight._id, // include the _id field
        airline: flight.airline,
        flightNumber: flight.flightNumber,
        origin: flight.origin,
        destination: flight.destination,
        departureDate: flight.departureDate,
        returnDate: flight.returnDate,

        availableSeats: flight.availableSeats,
        price: price,
      };
    } else {
      return {
        _id: flight._id, // include the _id field
        airline: flight.airline,
        flightNumber: flight.flightNumber,
        origin: flight.origin,
        destination: flight.destination,
        departureDate: flight.departureDate,

        availableSeats: flight.availableSeats,
        price: price,
      };
    }
  });

  res.status(200).json({
    success: true,
    data: filteredFlights,
  });
});
// @desc      Get flight by ID
// @route     GET /api/flights/:id
// @access    Public
exports.getFlightById = asyncHandler(async (req, res, next) => {
  const flight = await Flight.findById(req.params.id);

  if (!flight) {
    return next(new ErrorResponse("Flight not found", 404));
  }

  res.status(200).json({
    success: true,
    data: flight,
  });
});
