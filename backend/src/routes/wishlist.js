import express from 'express';
import wishlistController from '../controllers/wishlistController.js';

const router = express.Router();

// Get wishlist items
router.get('/', wishlistController.getWishlist);

// Add item to wishlist
router.post('/', wishlistController.addToWishlist);

// Check if item is in wishlist
router.get('/check/:productId', wishlistController.checkWishlist);

// Remove item from wishlist
router.delete('/:productId', wishlistController.removeFromWishlist);

export default router;
