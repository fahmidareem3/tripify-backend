const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  flightNumber: {
    type: mongoose.Schema.ObjectId,
    ref: "Flights",
  },
  passengerNum: Number,
  passengers: [
    {
      firstName: String,
      lastName: String,
      gender: String,
      dob: Date,
    },
  ],
  phoneNumber: Number,
  email: String,
  seats: [String],
  paymentStatus: {
    type: Boolean,
    default: false,
  },
  sourceName: String,
  destinationName: String,
  unitPrice: [Number],
  classtype: [String],
  totalPrice: Number,
  bookingDate: Date,
});

module.exports = mongoose.model("Booking", BookingSchema);
