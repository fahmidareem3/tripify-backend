const express = require("express");
const {
  getInvoiceByUser,
  getInvoiceById,
  getInvoiceByDate,
} = require("../controllers/booking");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.route("/findinvoicebyuser").get(protect, getInvoiceByUser);
router.route("/search/:id").get(protect, getInvoiceById);
router.route("/search").get(protect, getInvoiceByDate);
module.exports = router;
