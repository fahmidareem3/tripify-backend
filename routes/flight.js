const express = require("express");
const { createFlight } = require("../controllers/flight");

const router = express.Router();

router.post("/create", createFlight);

module.exports = router;
