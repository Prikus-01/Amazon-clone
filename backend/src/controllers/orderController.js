import orderModel from '../models/orderModel.js';
import cartModel from '../models/cartModel.js';

export const orderController = {
    /**
     * GET /api/orders
     * Get all orders
     */
    async getOrders(req, res) {
        try {
            const orders = await orderModel.getOrders();
            res.json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ error: 'Failed to fetch orders' });
        }
    },

    /**
     * GET /api/orders/:id
     * Get order by ID
     */
    async getOrderById(req, res) {
        try {
            const { id } = req.params;
            const order = await orderModel.getById(id);

            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }

            res.json(order);
        } catch (error) {
            console.error('Error fetching order:', error);
            res.status(500).json({ error: 'Failed to fetch order' });
        }
    },

    /**
     * POST /api/orders
     * Place a new order
     * Body: { items, shippingAddress, subtotal, shipping, tax, total }
     */
    async placeOrder(req, res) {
        try {
            const { items, shippingAddress, subtotal, shipping, tax, total } = req.body;

            // Validate required fields
            if (!items || items.length === 0) {
                return res.status(400).json({ error: 'Order items are required' });
            }

            if (!shippingAddress) {
                return res.status(400).json({ error: 'Shipping address is required' });
            }

            if (!shippingAddress.fullName || !shippingAddress.addressLine1 ||
                !shippingAddress.city || !shippingAddress.state ||
                !shippingAddress.zipCode || !shippingAddress.country) {
                return res.status(400).json({ error: 'Incomplete shipping address' });
            }

            const order = await orderModel.placeOrder({
                items,
                shippingAddress,
                subtotal,
                shipping,
                tax,
                total
            });

            // Clear cart after successful order
            await cartModel.clearCart();

            res.status(201).json(order);
        } catch (error) {
            console.error('Error placing order:', error);
            res.status(500).json({ error: 'Failed to place order' });
        }
    }
};

export default orderController;
