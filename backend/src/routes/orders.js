import express from 'express';
import orderController from '../controllers/orderController.js';

const router = express.Router();

// Get all orders
router.get('/', orderController.getOrders);

// Get order by ID
router.get('/:id', orderController.getOrderById);

// Place new order
router.post('/', orderController.placeOrder);

export default router;
