const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  flight: {
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
});

module.exports = mongoose.model("Booking", BookingSchema);
