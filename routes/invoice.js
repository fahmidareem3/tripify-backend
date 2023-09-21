const express = require("express");
const {
  getInvoiceByUser,
  getInvoiceById,
  getInvoiceByDate,
} = require("../controllers/booking");
const { protect, authorize } = require("../middleware/auth");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Invoice
 *   description: API to get invoices
 */

/**
 * @swagger
 * /api/invoice/search/{invoiceId}:
 *   get:
 *     summary: Get invoice by ID
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         description: ID of the invoice to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Invoice retrieved successfully
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
 *                       example: "6460c0ff03d634aa54ea587f"
 *                     user:
 *                       type: string
 *                       example: "644eb4ee173206754329c135"
 *                     email:
 *                       type: string
 *                       example: "fahmida@gmail.com"
 *                     date:
 *                       type: string
 *                       example: "2023-05-14T00:00:00.000Z"
 *                     flightNumber:
 *                       type: string
 *                       example: "6460c000e464793493f4e620"
 *                     bookingId:
 *                       type: string
 *                       example: "6460c0ff03d634aa54ea587a"
 *                     flightsource:
 *                       type: string
 *                       example: "LHR"
 *                     flightdes:
 *                       type: string
 *                       example: "JFK"
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
 *                     sourceName:
 *                       type: string
 *                       example: "London, England"
 *                     destinationName:
 *                       type: string
 *                       example: "New York, USA"
 *                     __v:
 *                       type: integer
 *       '404':
 *         description: Invoice not found
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
 *                   example: Invoice not found
 */
/**
 * @swagger
 * /api/invoice/search:
 *   post:
 *     summary: Search for invoices by dates
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Date range for invoice search
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-05-12"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-05-12"
 *             required:
 *               - startDate
 *               - endDate
 *     responses:
 *       '200':
 *         description: Invoices retrieved successfully
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
 *                       email:
 *                         type: string
 *                       date:
 *                         type: string
 *                       flightNumber:
 *                         type: string
 *                       bookingId:
 *                         type: string
 *                       flightsource:
 *                         type: string
 *                       flightdes:
 *                         type: string
 *                       seats:
 *                         type: array
 *                         items:
 *                           type: string
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
 *                       quantity:
 *                         type: integer
 *                       airline:
 *                         type: string
 *                       sourceName:
 *                         type: string
 *                       destinationName:
 *                         type: string
 *                       __v:
 *                         type: integer
 *       '400':
 *         description: Bad request - Invalid or missing date parameters
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
 *                   example: Invalid or missing date parameters
 */

router.route("/findinvoicebyuser").get(protect, getInvoiceByUser);
router.route("/search/:id").get(protect, getInvoiceById);
router
  .route("/search")
  .post(protect, authorize("admin", "travelagent"), getInvoiceByDate);
module.exports = router;
