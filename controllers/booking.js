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
  const booking = await Booking.create({
    flightNumber,
    user,
    phoneNumber,
    passengerNum,
    passengers,
    email,
    seats,
    paymentStatus,
  });

  // Update flight with booked seats
  const flight = await Flight.findById(flightNumber);

  seats.forEach((seat) => {
    flight.seats.map((flightseat) => {
      if (flightseat.seatNumber === seat) {
        flightseat.bookingStatus = true;
        flightseat.bookedBy = user;
      }
    });

    // const index = flight.seats.findIndex(
    //   (flightSeat) => flightSeat.seatNumber === seat.seatNumber
    // );
    // if (index >= 0) {
    //   flight.seats[index].bookedBy = user;
    //   flight.seats[index].bookingStatus = true;
    // }
  });

  await flight.save();

  res.status(201).json({
    success: true,
    data: booking,
  });
});
