const express = require("express");
const {
  getAllUsers,
  getAllBookings,
  getRevenue,
  createAnalyticsData,
  generateBookingDataForWeek,
} = require("../controllers/analytics");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const router = express.Router();

router.route("/getbyuser").get(protect, authorize("admin"), getAllUsers);
router.route("/getbybooking").get(protect, authorize("admin"), getAllBookings);
router.route("/getrevenue").get(protect, authorize("admin"), getRevenue);
router.route("/create").post(protect, authorize("admin"), createAnalyticsData);
router
  .route("/generatebookingdata")
  .get(protect, authorize("admin"), generateBookingDataForWeek);
module.exports = router;
