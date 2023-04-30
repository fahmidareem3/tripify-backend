const express = require("express");
const { createFlight, searchFlights } = require("../controllers/flight");

const router = express.Router();

router.post("/create", createFlight);
router.get("/search", searchFlights);

module.exports = router;
