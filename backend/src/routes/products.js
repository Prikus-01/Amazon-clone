import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

// Get all categories - must be before /:id to avoid conflict
router.get('/categories', productController.getCategories);

// Get category list (slugs only)
router.get('/category-list', productController.getCategoryList);

// Search products
router.get('/search', productController.searchProducts);

// Get products by category
router.get('/category/:category', productController.getProductsByCategory);

// Get all products with pagination
router.get('/', productController.getProducts);

// Get single product by ID
router.get('/:id', productController.getProductById);

export default router;
