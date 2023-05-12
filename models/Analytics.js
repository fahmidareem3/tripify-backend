const mongoose = require("mongoose");

const AnalyticsSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  location: {
    type: String,
    default: "Dhaka,Bangladesh",
  },
  totalBookings: {
    type: Number,
  },
});

module.exports = mongoose.model("Analytics", AnalyticsSchema);
