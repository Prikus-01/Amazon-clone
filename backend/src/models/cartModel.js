import { query } from '../utils/database.js';
import productModel from './productModel.js';

const DEFAULT_USER_ID = 1;

export const cartModel = {
    /**
     * Get all cart items for user
     */
    async getCart(userId = DEFAULT_USER_ID) {
        const result = await query(
            `SELECT 
                ci.id,
                ci.product_id,
                ci.quantity,
                ci.created_at,
                p.title,
                p.price,
                p.discount_percentage,
                p.thumbnail,
                p.stock
            FROM cart_items ci
            JOIN products p ON ci.product_id = p.id
            WHERE ci.user_id = $1
            ORDER BY ci.created_at DESC`,
            [userId]
        );

        return result.rows.map(row => ({
            id: row.product_id,
            title: row.title,
            price: parseFloat(row.price),
            discountPercentage: parseFloat(row.discount_percentage) || 0,
            thumbnail: row.thumbnail,
            stock: row.stock,
            quantity: row.quantity
        }));
    },

    /**
     * Add item to cart
     */
    async addItem(productId, quantity = 1, userId = DEFAULT_USER_ID) {
        // Check if product exists
        const product = await productModel.getById(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        // Upsert cart item
        await query(
            `INSERT INTO cart_items (user_id, product_id, quantity)
             VALUES ($1, $2, $3)
             ON CONFLICT (user_id, product_id) 
             DO UPDATE SET quantity = cart_items.quantity + $3, updated_at = CURRENT_TIMESTAMP`,
            [userId, productId, quantity]
        );

        return this.getCart(userId);
    },

    /**
     * Update cart item quantity
     */
    async updateQuantity(productId, quantity, userId = DEFAULT_USER_ID) {
        if (quantity <= 0) {
            return this.removeItem(productId, userId);
        }

        await query(
            `UPDATE cart_items 
             SET quantity = $1, updated_at = CURRENT_TIMESTAMP
             WHERE user_id = $2 AND product_id = $3`,
            [quantity, userId, productId]
        );

        return this.getCart(userId);
    },

    /**
     * Remove item from cart
     */
    async removeItem(productId, userId = DEFAULT_USER_ID) {
        await query(
            `DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2`,
            [userId, productId]
        );

        return this.getCart(userId);
    },

    /**
     * Clear entire cart
     */
    async clearCart(userId = DEFAULT_USER_ID) {
        await query(
            `DELETE FROM cart_items WHERE user_id = $1`,
            [userId]
        );

        return [];
    }
};

export default cartModel;
