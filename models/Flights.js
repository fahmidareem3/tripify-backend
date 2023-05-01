const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema({
  airline: String,
  flightNumber: String,
  origin: String,
  destination: String,
  departureDate: {
    type: Date,
  },
  returnDate: Date,
  arrivalTime: Date,
  availableSeats: Number,
  economyPrice: Number,
  businessPrice: Number,
  seats: [
    {
      seatNumber: String,
      classType: String,
      bookedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      bookingStatus: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model("Flights", FlightSchema);
