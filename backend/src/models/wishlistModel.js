import { query } from '../utils/database.js';
import productModel from './productModel.js';

const DEFAULT_USER_ID = 1;

export const wishlistModel = {
    /**
     * Get all wishlist items for user
     */
    async getWishlist(userId = DEFAULT_USER_ID) {
        const result = await query(
            `SELECT 
                wi.id,
                wi.product_id,
                wi.created_at,
                p.title,
                p.price,
                p.discount_percentage,
                p.thumbnail,
                p.rating,
                p.stock,
                p.category_slug as category
            FROM wishlist_items wi
            JOIN products p ON wi.product_id = p.id
            WHERE wi.user_id = $1
            ORDER BY wi.created_at DESC`,
            [userId]
        );

        return result.rows.map(row => ({
            id: row.product_id,
            title: row.title,
            price: parseFloat(row.price),
            discountPercentage: parseFloat(row.discount_percentage) || 0,
            thumbnail: row.thumbnail,
            rating: parseFloat(row.rating) || 0,
            stock: row.stock,
            category: row.category
        }));
    },

    /**
     * Add item to wishlist
     */
    async addItem(productId, userId = DEFAULT_USER_ID) {
        // Check if product exists
        const product = await productModel.getById(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        await query(
            `INSERT INTO wishlist_items (user_id, product_id)
             VALUES ($1, $2)
             ON CONFLICT (user_id, product_id) DO NOTHING`,
            [userId, productId]
        );

        return this.getWishlist(userId);
    },

    /**
     * Remove item from wishlist
     */
    async removeItem(productId, userId = DEFAULT_USER_ID) {
        await query(
            `DELETE FROM wishlist_items WHERE user_id = $1 AND product_id = $2`,
            [userId, productId]
        );

        return this.getWishlist(userId);
    },

    /**
     * Check if item is in wishlist
     */
    async isInWishlist(productId, userId = DEFAULT_USER_ID) {
        const result = await query(
            `SELECT id FROM wishlist_items WHERE user_id = $1 AND product_id = $2`,
            [userId, productId]
        );

        return result.rows.length > 0;
    }
};

export default wishlistModel;
