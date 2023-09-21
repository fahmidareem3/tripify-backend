const express = require("express");
const {
  createBooking,
  getBookingsByUser,
  getBookingById,
} = require("../controllers/booking");
const { protect } = require("../middleware/auth");

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: API to create bookings
 */

/**
 * @swagger
 * /api/booking/create:
 *   post:
 *     summary: Create a booking
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Booking details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               email:
 *                 type: string
 *               date:
 *                 type: string
 *               bookingId:
 *                 type: string
 *               flightsource:
 *                 type: string
 *               flightdes:
 *                 type: string
 *               seats:
 *                 type: array
 *                 items:
 *                   type: string
 *               unitPrice:
 *                 type: array
 *                 items:
 *                   type: number
 *               classtype:
 *                 type: array
 *                 items:
 *                   type: string
 *               totalPrice:
 *                 type: number
 *               quantity:
 *                 type: integer
 *               airline:
 *                 type: string
 *               flightNumber:
 *                 type: string
 *               sourceName:
 *                 type: string
 *               destinationName:
 *                 type: string
 *               invoiceId:
 *                 type: string
 *             required:
 *               - user
 *               - email
 *               - date
 *               - bookingId
 *               - flightsource
 *               - flightdes
 *               - seats
 *               - unitPrice
 *               - classtype
 *               - totalPrice
 *               - quantity
 *               - airline
 *               - flightNumber
 *               - sourceName
 *               - destinationName
 *               - invoiceId
 *     responses:
 *       '201':
 *         description: Booking created successfully
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
 *                     user:
 *                       type: string
 *                     email:
 *                       type: string
 *                     date:
 *                       type: string
 *                     bookingId:
 *                       type: string
 *                     flightsource:
 *                       type: string
 *                     flightdes:
 *                       type: string
 *                     seats:
 *                       type: array
 *                       items:
 *                         type: string
 *                     unitPrice:
 *                       type: array
 *                       items:
 *                         type: number
 *                     classtype:
 *                       type: array
 *                       items:
 *                         type: string
 *                     totalPrice:
 *                       type: number
 *                     quantity:
 *                       type: integer
 *                     airline:
 *                       type: string
 *                     flightNumber:
 *                       type: string
 *                     sourceName:
 *                       type: string
 *                     destinationName:
 *                       type: string
 *                     invoiceId:
 *                       type: string
 *       '400':
 *         description: Bad request - Invalid or missing data
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
 *                   example: Invalid or missing data
 */
/**
 * @swagger
 * /api/booking/findbyuser:
 *   get:
 *     summary: Get bookings by user
 *     tags: [Booking]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Bookings retrieved successfully
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
 *                       user:
 *                         type: string
 *                       flightNumber:
 *                         type: string
 *                       passengerNum:
 *                         type: integer
 *                       passengers:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             firstName:
 *                               type: string
 *                             lastName:
 *                               type: string
 *                             gender:
 *                               type: string
 *                             dob:
 *                               type: string
 *                             _id:
 *                               type: string
 *                       phoneNumber:
 *                         type: integer
 *                       email:
 *                         type: string
 *                       seats:
 *                         type: array
 *                         items:
 *                           type: string
 *                       paymentStatus:
 *                         type: boolean
 *                       sourceName:
 *                         type: string
 *                       destinationName:
 *                         type: string
 *                       unitPrice:
 *                         type: array
 *                         items:
 *                           type: number
 *                       classtype:
 *                         type: array
 *                         items:
 *                           type: string
 *                       totalPrice:
 *                         type: number
 *                       bookingDate:
 *                         type: string
 *                       __v:
 *                         type: integer
 *       '401':
 *         description: Unauthorized - Missing or invalid bearer token
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
 *                   example: Unauthorized
 */

router.route("/create").post(protect, createBooking);
router.route("/findbyuser").get(protect, getBookingsByUser);
router.route("/search/:id").get(protect, getBookingById);

module.exports = router;
