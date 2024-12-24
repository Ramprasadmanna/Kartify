import express from 'express'
import { createOrder, createRazorPayOrder, getMyOrders, getOrderById, verifyRazorPaySignature, getOrders, updateOrderToDelivered, updateOrderToPaid } from '#controllers/order.controller.js'
import { protect, admin } from '#middlewares/auth.middleware.js'

const router = express.Router();

// User Route
router.route('/createOrder').post(protect, createOrder);
router.route('/createRazorPayOrder').post(protect, createRazorPayOrder);
router.route('/verifyRazorPaySignature').post(protect, verifyRazorPaySignature);
router.route('/getMyOrders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);


// Admin Route
router.route('/').get(protect, admin, getOrders);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;