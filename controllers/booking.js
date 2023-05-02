const asyncHandler = require("../middleware/async");
const Flight = require("../models/Flights");
const Booking = require("../models/Booking");

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

  // Create booking

  // Update flight with booked seats
  const flight = await Flight.findById(flightNumber);
  let unitPrice = new Array(passengerNum);
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
        } else {
          unitPrice[i] = flight.businessPrice;
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
  });

  res.status(201).json({
    success: true,
    data: booking,
  });
});

// @desc      Get all bookings by user
// @route     GET /api/bookings/user
// @access    Private
exports.getBookingsByUser = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const bookings = await Booking.find({ user: userId });

  res.status(200).json({
    success: true,
    data: bookings,
  });
});
