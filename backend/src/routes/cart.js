import express from 'express';
import cartController from '../controllers/cartController.js';

const router = express.Router();

// Get cart items
router.get('/', cartController.getCart);

// Add item to cart
router.post('/', cartController.addToCart);

// Update cart item quantity
router.put('/:productId', cartController.updateQuantity);

// Remove item from cart
router.delete('/:productId', cartController.removeFromCart);

// Clear entire cart
router.delete('/', cartController.clearCart);

export default router;
