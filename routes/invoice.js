const express = require("express");
const { getInvoiceByUser, getInvoiceById } = require("../controllers/booking");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.route("/findinvoicebyuser").get(protect, getInvoiceByUser);
router.route("/search/:id").get(protect, getInvoiceById);
module.exports = router;
