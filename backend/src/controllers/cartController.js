import cartModel from '../models/cartModel.js';

export const cartController = {
    /**
     * GET /api/cart
     * Get cart items
     */
    async getCart(req, res) {
        try {
            const cart = await cartModel.getCart();
            res.json(cart);
        } catch (error) {
            console.error('Error fetching cart:', error);
            res.status(500).json({ error: 'Failed to fetch cart' });
        }
    },

    /**
     * POST /api/cart
     * Add item to cart
     * Body: { productId, quantity }
     */
    async addToCart(req, res) {
        try {
            const { productId, quantity = 1 } = req.body;

            if (!productId) {
                return res.status(400).json({ error: 'Product ID is required' });
            }

            const cart = await cartModel.addItem(parseInt(productId), parseInt(quantity));
            res.json(cart);
        } catch (error) {
            console.error('Error adding to cart:', error);
            if (error.message === 'Product not found') {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.status(500).json({ error: 'Failed to add item to cart' });
        }
    },

    /**
     * PUT /api/cart/:productId
     * Update cart item quantity
     * Body: { quantity }
     */
    async updateQuantity(req, res) {
        try {
            const { productId } = req.params;
            const { quantity } = req.body;

            if (quantity === undefined) {
                return res.status(400).json({ error: 'Quantity is required' });
            }

            const cart = await cartModel.updateQuantity(parseInt(productId), parseInt(quantity));
            res.json(cart);
        } catch (error) {
            console.error('Error updating cart:', error);
            res.status(500).json({ error: 'Failed to update cart' });
        }
    },

    /**
     * DELETE /api/cart/:productId
     * Remove item from cart
     */
    async removeFromCart(req, res) {
        try {
            const { productId } = req.params;
            const cart = await cartModel.removeItem(parseInt(productId));
            res.json(cart);
        } catch (error) {
            console.error('Error removing from cart:', error);
            res.status(500).json({ error: 'Failed to remove item from cart' });
        }
    },

    /**
     * DELETE /api/cart
     * Clear entire cart
     */
    async clearCart(req, res) {
        try {
            await cartModel.clearCart();
            res.json({ message: 'Cart cleared successfully' });
        } catch (error) {
            console.error('Error clearing cart:', error);
            res.status(500).json({ error: 'Failed to clear cart' });
        }
    }
};

export default cartController;
