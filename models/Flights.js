const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema({
  airline: String,
  flightNumber: String,
  origin: String,
  destination: String,
  departureDate: {
    type: Date,
    default: null,
  },
  arrivalDate: Date,
  availableSeats: Number,
  economyPrice: Number,
  businessPrice: Number,
});

module.exports = mongoose.model("Flights", FlightSchema);
