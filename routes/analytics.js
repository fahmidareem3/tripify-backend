const express = require("express");
const {
  getAllUsers,
  getAllBookings,
  getRevenue,
  createAnalyticsData,
  generateBookingDataForWeek,
  updateAnalyticsData,
} = require("../controllers/analytics");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Data for the business owner
 */
/**
 * @swagger
 * /api/analytics/getbyuser:
 *   get:
 *     summary: Get analytics data for users
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Analytics data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 9
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       photo:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       role:
 *                         type: string
 *                       createdAt:
 *                         type: string
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
/**
 * @swagger
 * /api/analytics/getbybooking:
 *   get:
 *     summary: Get analytics data by booking
 *     tags: [Analytics]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Analytics data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 16
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
 *                           type: integer
 *                       classtype:
 *                         type: array
 *                         items:
 *                           type: string
 *                       totalPrice:
 *                         type: integer
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
/**
 * @swagger
 * /api/analytics/getrevenue:
 *   get:
 *     summary: Get total revenue
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Total revenue retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 totalRevenue:
 *                   type: integer
 *                   example: 5800
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
/**
 * @swagger
 * /api/analytics/create:
 *   post:
 *     summary: Create analytics data
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: true
 *               data:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6460c0a503d634aa54ea5831"
 *                     user:
 *                       type: string
 *                       example: "Shahriar Rumel"
 *                     location:
 *                       type: string
 *                       example: "Dhaka,Bangladesh"
 *                     totalBookings:
 *                       type: integer
 *                       example: 6
 *                     __v:
 *                       type: integer
 *                       example: 0
 *                 example:
 *                   - _id: "6460c0a503d634aa54ea5831"
 *                     user: "Shahriar Rumel"
 *                     location: "Dhaka,Bangladesh"
 *                     totalBookings: 6
 *                     __v: 0
 *     responses:
 *       '201':
 *         description: Analytics data created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Analytics data created successfully
 *       '400':
 *         description: Bad Request - Invalid input data
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
 *                   example: Bad Request
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
/**
 * @swagger
 * /api/analytics/generatebookingdata:
 *   post:
 *     summary: Generate booking data for a week
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: true
 *               data:
 *                 type: object
 *                 properties:
 *                   17:
 *                     type: integer
 *                     example: 0
 *                   18:
 *                     type: integer
 *                     example: 0
 *                   19:
 *                     type: integer
 *                     example: 0
 *                   20:
 *                     type: integer
 *                     example: 0
 *                   21:
 *                     type: integer
 *                     example: 1
 *                   22:
 *                     type: integer
 *                     example: 0
 *                   23:
 *                     type: integer
 *                     example: 0
 *                 example:
 *                   17: 0
 *                   18: 0
 *                   19: 0
 *                   20: 0
 *                   21: 1
 *                   22: 0
 *                   23: 0
 *     responses:
 *       '201':
 *         description: Booking data generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Booking data generated successfully
 *       '400':
 *         description: Bad Request - Invalid input data
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
 *                   example: Bad Request
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
/**
 * @swagger
 * /api/analytics/generatetopseller:
 *   put:
 *     summary: Generate top seller data
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: true
 *               data:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6460c0a503d634aa54ea5831"
 *                     user:
 *                       type: string
 *                       example: "Shahriar Rumel"
 *                     location:
 *                       type: string
 *                       example: "Dhaka,Bangladesh"
 *                     totalBookings:
 *                       type: integer
 *                       example: 6
 *                     __v:
 *                       type: integer
 *                       example: 0
 *                 example:
 *                   - _id: "6460c0a503d634aa54ea5831"
 *                     user: "Shahriar Rumel"
 *                     location: "Dhaka,Bangladesh"
 *                     totalBookings: 6
 *                     __v: 0
 *                   - _id: "650ca51543e24e7beeac9a9d"
 *                     user: "Shahriar Rumel"
 *                     location: "Dhaka,Bangladesh"
 *                     totalBookings: 6
 *                     __v: 0
 *                   # Add more items as needed
 *     responses:
 *       '201':
 *         description: Top seller data generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Top seller data generated successfully
 *       '400':
 *         description: Bad Request - Invalid input data
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
 *                   example: Bad Request
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

router.route("/getbyuser").get(protect, authorize("admin"), getAllUsers);
router.route("/getbybooking").get(protect, authorize("admin"), getAllBookings);
router.route("/getrevenue").get(protect, authorize("admin"), getRevenue);
router.route("/create").post(protect, authorize("admin"), createAnalyticsData);
router
  .route("/generatebookingdata")
  .get(protect, authorize("admin"), generateBookingDataForWeek);
router
  .route("/generatetopseller")
  .put(protect, authorize("admin"), updateAnalyticsData);
module.exports = router;
