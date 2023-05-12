const asyncHandler = require("../middleware/async");
const Flight = require("../models/Flights");
const Booking = require("../models/Booking");
const User = require("../models/User");
const Invoice = require("../models/Invoice");
const Analytics = require("../models/Analytics");
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  const count = users.length;
  res.status(200).json({
    success: true,
    count,
    data: users,
  });
});

exports.getAllBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find();
  const count = bookings.length;
  res.status(200).json({
    success: true,
    count,
    data: bookings,
  });
});

exports.getRevenue = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find();
  const totalRevenue = calculateTotalRevenue(bookings);
  res.status(200).json({
    success: true,
    totalRevenue,
  });
});

function calculateTotalRevenue(bookings) {
  let totalRevenue = 0;
  bookings.forEach((booking) => {
    totalRevenue += booking.totalPrice;
  });
  return totalRevenue;
}

exports.createAnalyticsData = asyncHandler(async (req, res, next) => {
  // Find all users
  const users = await User.find();

  // Iterate over each user
  for (const user of users) {
    // Find bookings for the current user
    const totalBookings = await Booking.countDocuments({ user: user._id });

    // Create analytics data
    const analyticsData = new Analytics({
      user: user.name,
      totalBookings: totalBookings,
    });

    // Save the analytics data
    await analyticsData.save();
  }

  // Retrieve the analytics data in sorted order by total bookings
  const analytics = await Analytics.find().sort({ totalBookings: -1 });

  res.status(200).json({
    success: true,
    data: analytics,
  });
});

exports.updateAnalyticsData = asyncHandler(async (req, res, next) => {
  // Find all users
  const users = await User.find();

  // Iterate over each user
  for (const user of users) {
    // Find bookings count for the current user
    const totalBookings = await Booking.countDocuments({ user: user._id });

    // Find or create analytics data for the current user
    let analytics = await Analytics.findOne({ user: user.name });

    if (!analytics) {
      analytics = new Analytics({ user: user.name });
    }

    // Update the total bookings count
    analytics.totalBookings = totalBookings;

    // Save the analytics data
    await analytics.save();
  }

  // Retrieve the analytics data in sorted order by total bookings
  const analytics = await Analytics.find().sort({ totalBookings: -1 });

  res.status(200).json({
    success: true,
    data: analytics,
  });
});

exports.generateBookingDataForWeek = asyncHandler(async (req, res, next) => {
  // Get the start and end dates of the week
  const currentDate = new Date();
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - currentDate.getDay()
  );
  const endDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - currentDate.getDay() + 6
  );

  // Initialize an object to store the booking counts for each day
  const bookingCounts = {};

  // Find bookings within the week
  const bookings = await Booking.find({
    bookingDate: { $gte: startDate, $lte: endDate },
  });

  // Iterate over each day of the week
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);
    const currentDay = currentDate.getDate();

    // Set the initial count to zero for each day
    bookingCounts[currentDay] = 0;

    // Iterate over each booking and increment the count for the day
    bookings.forEach((booking) => {
      const bookingDate = booking.bookingDate.getDate();

      if (bookingDate === currentDay) {
        bookingCounts[currentDay]++;
      }
    });
  }

  res.status(200).json({
    success: true,
    data: bookingCounts,
  });
});
