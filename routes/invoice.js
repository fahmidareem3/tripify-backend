const express = require("express");
const {
  getInvoiceByUser,
  getInvoiceById,
  getInvoiceByDate,
} = require("../controllers/booking");
const { protect, authorize } = require("../middleware/auth");
const router = express.Router();

router.route("/findinvoicebyuser").get(protect, getInvoiceByUser);
router.route("/search/:id").get(protect, getInvoiceById);
router
  .route("/search")
  .get(protect, authorize("travelagent"), getInvoiceByDate);
module.exports = router;
