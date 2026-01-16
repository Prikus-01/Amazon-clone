import { query, getClient } from '../utils/database.js';

const DEFAULT_USER_ID = 1;

/**
 * Generate unique order ID
 */
function generateOrderId() {
    return 'ORD-' + Date.now().toString(36).toUpperCase() + '-' +
        Math.random().toString(36).substring(2, 7).toUpperCase();
}

export const orderModel = {
    /**
     * Get all orders for user
     */
    async getOrders(userId = DEFAULT_USER_ID) {
        const result = await query(
            `SELECT 
                o.*,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', oi.product_id,
                            'title', p.title,
                            'price', oi.price,
                            'discountPercentage', oi.discount_percentage,
                            'quantity', oi.quantity,
                            'thumbnail', p.thumbnail
                        )
                    ) FILTER (WHERE oi.id IS NOT NULL),
                    '[]'
                ) as items
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            LEFT JOIN products p ON oi.product_id = p.id
            WHERE o.user_id = $1
            GROUP BY o.id
            ORDER BY o.order_date DESC`,
            [userId]
        );

        return result.rows.map(formatOrder);
    },

    /**
     * Get a single order by ID
     */
    async getById(orderId, userId = DEFAULT_USER_ID) {
        const result = await query(
            `SELECT 
                o.*,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', oi.product_id,
                            'title', p.title,
                            'price', oi.price,
                            'discountPercentage', oi.discount_percentage,
                            'quantity', oi.quantity,
                            'thumbnail', p.thumbnail
                        )
                    ) FILTER (WHERE oi.id IS NOT NULL),
                    '[]'
                ) as items
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            LEFT JOIN products p ON oi.product_id = p.id
            WHERE o.id = $1 AND o.user_id = $2
            GROUP BY o.id`,
            [orderId, userId]
        );

        if (result.rows.length === 0) {
            return null;
        }

        return formatOrder(result.rows[0]);
    },

    /**
     * Place a new order
     */
    async placeOrder(orderData, userId = DEFAULT_USER_ID) {
        const client = await getClient();

        try {
            await client.query('BEGIN');

            const orderId = generateOrderId();
            const { items, shippingAddress, subtotal, shipping, tax, total } = orderData;

            // Insert order
            await client.query(
                `INSERT INTO orders (
                    id, user_id, status, subtotal, shipping, tax, total,
                    shipping_full_name, shipping_address_line1, shipping_address_line2,
                    shipping_city, shipping_state, shipping_zip_code, shipping_country, shipping_phone
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
                [
                    orderId,
                    userId,
                    'Confirmed',
                    subtotal,
                    shipping || 0,
                    tax || 0,
                    total,
                    shippingAddress.fullName,
                    shippingAddress.addressLine1,
                    shippingAddress.addressLine2 || null,
                    shippingAddress.city,
                    shippingAddress.state,
                    shippingAddress.zipCode,
                    shippingAddress.country,
                    shippingAddress.phone
                ]
            );

            // Insert order items
            for (const item of items) {
                await client.query(
                    `INSERT INTO order_items (order_id, product_id, quantity, price, discount_percentage)
                     VALUES ($1, $2, $3, $4, $5)`,
                    [
                        orderId,
                        item.id,
                        item.quantity,
                        item.price,
                        item.discountPercentage || 0
                    ]
                );
            }

            await client.query('COMMIT');

            // Return the created order
            return this.getById(orderId, userId);

        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
};

/**
 * Format order row to expected response format
 */
function formatOrder(row) {
    return {
        id: row.id,
        status: row.status,
        date: row.order_date,
        subtotal: parseFloat(row.subtotal),
        shipping: parseFloat(row.shipping),
        tax: parseFloat(row.tax),
        total: parseFloat(row.total),
        shippingAddress: {
            fullName: row.shipping_full_name,
            addressLine1: row.shipping_address_line1,
            addressLine2: row.shipping_address_line2,
            city: row.shipping_city,
            state: row.shipping_state,
            zipCode: row.shipping_zip_code,
            country: row.shipping_country,
            phone: row.shipping_phone
        },
        items: row.items || []
    };
}

export default orderModel;
