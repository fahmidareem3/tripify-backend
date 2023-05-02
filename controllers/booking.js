const asyncHandler = require("../middleware/async");
const Flight = require("../models/Flights");
const Booking = require("../models/Booking");
const User = require("../models/User");

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
  };
  res.status(201).json({
    success: true,
    data,
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
