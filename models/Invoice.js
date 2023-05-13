const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  flightNumber: {
    type: mongoose.Schema.ObjectId,
    ref: "Flights",
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  flightsource: {
    type: String,
    required: true,
  },
  flightdes: {
    type: String,
    required: true,
  },
  seats: [
    {
      type: String,
      required: true,
    },
  ],
  unitPrice: [
    {
      type: Number,
      required: true,
    },
  ],
  classtype: [
    {
      type: String,
      required: true,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    required: true,
  },
  airline: {
    type: String,
    required: true,
  },
  sourceName: String,
  destinationName: String,
});

module.exports = mongoose.model("Invoice", invoiceSchema);
