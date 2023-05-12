const asyncHandler = require("../middleware/async");
const Flight = require("../models/Flights");
const Booking = require("../models/Booking");
const User = require("../models/User");
const Invoice = require("../models/Invoice");

exports.createBooking = asyncHandler(async (req, res, next) => {
  const {
    flightNumber,
    phoneNumber,
    email,
    passengerNum,
    passengers,
    seats,
    paymentStatus,
  } = req.body;

  const user = req.user.id;
  const bookingDate = new Date().toISOString().slice(0, 10);
  // Create booking

  // Update flight with booked seats
  const flight = await Flight.findById(flightNumber);
  let unitPrice = new Array(passengerNum);
  let classtype = new Array(passengerNum);
  let i = 0;
  seats.forEach((seat) => {
    flight.seats.map((flightseat) => {
      if (
        flightseat.seatNumber === seat &&
        flightseat.bookingStatus === false
      ) {
        flightseat.bookingStatus = true;
        flightseat.bookedBy = user;
        if (flightseat.classType === "economy") {
          unitPrice[i] = flight.economyPrice;
          console.log(unitPrice[i]);
          classtype[i] = "economy";
        } else {
          unitPrice[i] = flight.businessPrice;
          console.log(unitPrice[i]);
          classtype[i] = "business";
        }
        i++;
      }
    });
  });
  let totalPrice = 0;
  let j;
  for (j = 0; j < passengerNum; j++) {
    totalPrice += unitPrice[j];
  }
  await flight.save();
  const booking = await Booking.create({
    flightNumber,
    user,
    phoneNumber,
    passengerNum,
    passengers,
    email,
    seats,
    paymentStatus,
    unitPrice,
    totalPrice,
    classtype,
    bookingDate,
    classtype,
  });
  const requser = await User.findById(req.user.id);
  const data = {
    user: booking.user,
    email: requser.email,
    date: bookingDate,
    bookingId: booking._id,
    flightsource: flight.origin,
    flightdes: flight.destination,
    seats: seats,
    unitPrice: unitPrice,
    classtype: classtype,
    totalPrice: totalPrice,
    quantity: 1,
    airline: flight.airline,
    flightNumber: flight._id,
  };
  const invoice = await Invoice.create(data);
  res.status(201).json({
    success: true,
    data,
  });
});

// @desc      Get all bookings by user
// @route     GET /api/booking/findbyuser
// @access    Private
exports.getBookingsByUser = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const bookings = await Booking.find({ user: userId });

  res.status(200).json({
    success: true,
    data: bookings,
  });
});
// @desc      Get all bookings by user
// @route     GET /api/booking/findinvoicebyuser
// @access    Private
exports.getInvoiceByUser = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const invoices = await Invoice.find({ user: userId });

  res.status(200).json({
    success: true,
    data: invoices,
  });
});

// @desc      Get bookings by ID
// @route     GET /api/booking/search/:id
// @access    Public
exports.getBookingById = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new ErrorResponse("Booking not found", 404));
  }

  res.status(200).json({
    success: true,
    data: booking,
  });
});

// @desc      Get invoice by ID
// @route     GET /api/invoice/search/:id
// @access    Public
exports.getInvoiceById = asyncHandler(async (req, res, next) => {
  const invoice = await Invoice.findById(req.params.id);

  if (!invoice) {
    return next(new ErrorResponse("Invoice not found", 404));
  }

  res.status(200).json({
    success: true,
    data: invoice,
  });
});

exports.getInvoiceByDate = asyncHandler(async (req, res, next) => {
  const { origin, destination } = req.query;
  const departureDate = req.query.departureDate;
  const returnDate = req.query.returnDate;

  const query = {
    origin: origin,
    destination: destination,
    $expr: {
      $eq: [
        { $dateToString: { format: "%Y-%m-%d", date: "$departureDate" } },
        departureDate,
      ],
    },
  };

  if (returnDate) {
    query.$expr.$eq.push({
      $dateToString: { format: "%Y-%m-%d", date: "$returnDate" },
      returnDate,
    });
  } else {
    query.returnDate = null;
  }

  const flights = await Flight.find(query);
  const flightIds = flights.map((flight) => flight._id);

  const invoices = await Invoice.find({ flightNumber: { $in: flightIds } });

  res.status(200).json({
    success: true,
    data: invoices,
  });
});
