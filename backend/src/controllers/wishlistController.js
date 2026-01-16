import wishlistModel from '../models/wishlistModel.js';

export const wishlistController = {
    /**
     * GET /api/wishlist
     * Get wishlist items
     */
    async getWishlist(req, res) {
        try {
            const wishlist = await wishlistModel.getWishlist();
            res.json(wishlist);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            res.status(500).json({ error: 'Failed to fetch wishlist' });
        }
    },

    /**
     * POST /api/wishlist
     * Add item to wishlist
     * Body: { productId }
     */
    async addToWishlist(req, res) {
        try {
            const { productId } = req.body;

            if (!productId) {
                return res.status(400).json({ error: 'Product ID is required' });
            }

            const wishlist = await wishlistModel.addItem(parseInt(productId));
            res.json(wishlist);
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            if (error.message === 'Product not found') {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.status(500).json({ error: 'Failed to add item to wishlist' });
        }
    },

    /**
     * DELETE /api/wishlist/:productId
     * Remove item from wishlist
     */
    async removeFromWishlist(req, res) {
        try {
            const { productId } = req.params;
            const wishlist = await wishlistModel.removeItem(parseInt(productId));
            res.json(wishlist);
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            res.status(500).json({ error: 'Failed to remove item from wishlist' });
        }
    },

    /**
     * GET /api/wishlist/check/:productId
     * Check if item is in wishlist
     */
    async checkWishlist(req, res) {
        try {
            const { productId } = req.params;
            const isInWishlist = await wishlistModel.isInWishlist(parseInt(productId));
            res.json({ isInWishlist });
        } catch (error) {
            console.error('Error checking wishlist:', error);
            res.status(500).json({ error: 'Failed to check wishlist' });
        }
    }
};

export default wishlistController;
