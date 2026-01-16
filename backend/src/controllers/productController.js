import productModel from '../models/productModel.js';
import categoryModel from '../models/categoryModel.js';

export const productController = {
    /**
     * GET /api/products
     * Get all products with pagination
     */
    async getProducts(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 30;
            const skip = parseInt(req.query.skip) || 0;

            const result = await productModel.getAll(limit, skip);
            res.json(result);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: 'Failed to fetch products' });
        }
    },

    /**
     * GET /api/products/:id
     * Get a single product by ID
     */
    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await productModel.getById(parseInt(id));

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            res.json(product);
        } catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).json({ error: 'Failed to fetch product' });
        }
    },

    /**
     * GET /api/products/search?q=query
     * Search products by query
     */
    async searchProducts(req, res) {
        try {
            const { q } = req.query;
            const limit = parseInt(req.query.limit) || 30;

            if (!q) {
                return res.status(400).json({ error: 'Search query is required' });
            }

            const result = await productModel.search(q, limit);
            res.json(result);
        } catch (error) {
            console.error('Error searching products:', error);
            res.status(500).json({ error: 'Failed to search products' });
        }
    },

    /**
     * GET /api/products/category/:category
     * Get products by category
     */
    async getProductsByCategory(req, res) {
        try {
            const { category } = req.params;
            const limit = parseInt(req.query.limit) || 30;
            const skip = parseInt(req.query.skip) || 0;

            const result = await productModel.getByCategory(category, limit, skip);
            res.json(result);
        } catch (error) {
            console.error('Error fetching products by category:', error);
            res.status(500).json({ error: 'Failed to fetch products' });
        }
    },

    /**
     * GET /api/products/categories
     * Get all categories
     */
    async getCategories(req, res) {
        try {
            const categories = await categoryModel.getAll();
            res.json(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            res.status(500).json({ error: 'Failed to fetch categories' });
        }
    },

    /**
     * GET /api/products/category-list
     * Get category slugs only
     */
    async getCategoryList(req, res) {
        try {
            const list = await categoryModel.getList();
            res.json(list);
        } catch (error) {
            console.error('Error fetching category list:', error);
            res.status(500).json({ error: 'Failed to fetch category list' });
        }
    }
};

export default productController;
