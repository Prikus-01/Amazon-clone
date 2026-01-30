// Backend API Service
// const BASE_URL = 'https://amazon-clone-vsex.onrender.com/api';
const BASE_URL = 'http://localhost:3000/api';

export const api = {
    // ==================== PRODUCTS ====================

    // Get all products with pagination
    async getProducts(limit = 30, skip = 0) {
        const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
        return response.json();
    },

    // Get a single product by ID
    async getProduct(id) {
        const response = await fetch(`${BASE_URL}/products/${id}`);
        return response.json();
    },

    // Search products by query
    async searchProducts(query, limit = 30) {
        const response = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=${limit}`);
        return response.json();
    },

    // Get all categories
    async getCategories() {
        const response = await fetch(`${BASE_URL}/products/categories`);
        return response.json();
    },

    // Get products by category
    async getProductsByCategory(category, limit = 30, skip = 0) {
        const response = await fetch(`${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`);
        return response.json();
    },

    // Get category list (slug names only)
    async getCategoryList() {
        const response = await fetch(`${BASE_URL}/products/category-list`);
        return response.json();
    },

    // ==================== CART ====================

    // Get cart items
    async getCart() {
        const response = await fetch(`${BASE_URL}/cart`);
        return response.json();
    },

    // Add item to cart
    async addToCart(productId, quantity = 1) {
        const response = await fetch(`${BASE_URL}/cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity })
        });
        return response.json();
    },

    // Update cart item quantity
    async updateCartQuantity(productId, quantity) {
        const response = await fetch(`${BASE_URL}/cart/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity })
        });
        return response.json();
    },

    // Remove item from cart
    async removeFromCart(productId) {
        const response = await fetch(`${BASE_URL}/cart/${productId}`, {
            method: 'DELETE'
        });
        return response.json();
    },

    // Clear cart
    async clearCart() {
        const response = await fetch(`${BASE_URL}/cart`, {
            method: 'DELETE'
        });
        return response.json();
    },

    // ==================== WISHLIST ====================

    // Get wishlist items
    async getWishlist() {
        const response = await fetch(`${BASE_URL}/wishlist`);
        return response.json();
    },

    // Add item to wishlist
    async addToWishlist(productId) {
        const response = await fetch(`${BASE_URL}/wishlist`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId })
        });
        return response.json();
    },

    // Remove item from wishlist
    async removeFromWishlist(productId) {
        const response = await fetch(`${BASE_URL}/wishlist/${productId}`, {
            method: 'DELETE'
        });
        return response.json();
    },

    // Check if item is in wishlist
    async isInWishlist(productId) {
        const response = await fetch(`${BASE_URL}/wishlist/check/${productId}`);
        const data = await response.json();
        return data.isInWishlist;
    },

    // ==================== ORDERS ====================

    // Get all orders
    async getOrders() {
        const response = await fetch(`${BASE_URL}/orders`);
        return response.json();
    },

    // Get order by ID
    async getOrder(orderId) {
        const response = await fetch(`${BASE_URL}/orders/${orderId}`);
        return response.json();
    },

    // Place new order
    async placeOrder(orderData) {
        const response = await fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        return response.json();
    }
};

export default api;
