const express = require("express");
const {
  createFlight,
  searchFlights,
  getFlightById,
} = require("../controllers/flight");

/**
 * @swagger
 * tags:
 *   name: Flights
 *   description: API to search flights
 */

/**
 * @swagger
 * /api/flights/search:
 *   get:
 *     summary: Search for flights
 *     tags: [Flights]
 *     parameters:
 *       - in: query
 *         name: origin
 *         description: Departure airport code
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: destination
 *         description: Destination airport code
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: departureDate
 *         description: Departure date (YYYY-MM-DD)
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: classType
 *         description: Class type (e.g., economy, business)
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: passengers
 *         description: Number of passengers
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Flights found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6460c000e464793493f4e655"
 *                       airline:
 *                         type: string
 *                         example: "Airline Name"
 *                       flightNumber:
 *                         type: string
 *                         example: "FLGHT123"
 *                       origin:
 *                         type: string
 *                         example: "DAC"
 *                       destination:
 *                         type: string
 *                         example: "LHR"
 *                       departureDate:
 *                         type: string
 *                         example: "2023-05-15T08:00:00.000Z"
 *                       arrivalTime:
 *                         type: string
 *                         example: "2023-05-16T10:30:00.000Z"
 *                       availableSeats:
 *                         type: integer
 *                         example: 300
 *                       price:
 *                         type: number
 *                         example: 500
 *                       sourceName:
 *                         type: string
 *                         example: "Dhaka, Bangladesh"
 *                       destinationName:
 *                         type: string
 *                         example: "London, England"
 *       '400':
 *         description: Bad request - Invalid or missing parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Invalid or missing parameters
 */
/**
 * @swagger
 * /api/flights/search/{flightId}:
 *   get:
 *     summary: Get flight details by ID
 *     tags: [Flights]
 *     parameters:
 *       - in: path
 *         name: flightId
 *         description: ID of the flight to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Flight details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6460c000e464793493f4e620"
 *                     airline:
 *                       type: string
 *                       example: "British Airways"
 *                     flightNumber:
 *                       type: string
 *                       example: "BA001"
 *                     origin:
 *                       type: string
 *                       example: "LHR"
 *                     destination:
 *                       type: string
 *                       example: "JFK"
 *                     departureDate:
 *                       type: string
 *                       example: "2023-05-31T00:00:00.000Z"
 *                     sourceName:
 *                       type: string
 *                       example: "London, England"
 *                     destinationName:
 *                       type: string
 *                       example: "New York, USA"
 *                     returnDate:
 *                       type: string
 *                     arrivalTime:
 *                       type: string
 *                       example: "2023-05-31T06:30:00.000Z"
 *                     availableSeats:
 *                       type: integer
 *                       example: 250
 *                     economyPrice:
 *                       type: number
 *                       example: 150
 *                     businessPrice:
 *                       type: number
 *                       example: 400
 *                     seats:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           seatNumber:
 *                             type: string
 *                           classType:
 *                             type: string
 *                           bookedBy:
 *                             type: string
 *                           bookingStatus:
 *                             type: boolean
 *       '404':
 *         description: Flight not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Flight not found
 */

const router = express.Router();

router.post("/create", createFlight);
router.get("/search", searchFlights);
router.get("/search/:id", getFlightById);

module.exports = router;
