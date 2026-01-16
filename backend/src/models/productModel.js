import { query } from '../utils/database.js';

export const productModel = {
    /**
     * Get all products with pagination
     */
    async getAll(limit = 30, skip = 0) {
        const result = await query(
            `SELECT 
                p.*,
                c.name as category_name,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'rating', r.rating,
                            'comment', r.comment,
                            'date', r.review_date,
                            'reviewerName', r.reviewer_name,
                            'reviewerEmail', r.reviewer_email
                        )
                    ) FILTER (WHERE r.id IS NOT NULL), 
                    '[]'
                ) as reviews
            FROM products p
            LEFT JOIN categories c ON p.category_slug = c.slug
            LEFT JOIN reviews r ON p.id = r.product_id
            GROUP BY p.id, c.name
            ORDER BY p.id
            LIMIT $1 OFFSET $2`,
            [limit, skip]
        );

        const countResult = await query('SELECT COUNT(*) FROM products');
        const total = parseInt(countResult.rows[0].count);

        return {
            products: result.rows.map(formatProduct),
            total,
            skip,
            limit
        };
    },

    /**
     * Get a single product by ID
     */
    async getById(id) {
        const result = await query(
            `SELECT 
                p.*,
                c.name as category_name,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'rating', r.rating,
                            'comment', r.comment,
                            'date', r.review_date,
                            'reviewerName', r.reviewer_name,
                            'reviewerEmail', r.reviewer_email
                        )
                    ) FILTER (WHERE r.id IS NOT NULL), 
                    '[]'
                ) as reviews
            FROM products p
            LEFT JOIN categories c ON p.category_slug = c.slug
            LEFT JOIN reviews r ON p.id = r.product_id
            WHERE p.id = $1
            GROUP BY p.id, c.name`,
            [id]
        );

        if (result.rows.length === 0) {
            return null;
        }

        return formatProduct(result.rows[0]);
    },

    /**
     * Search products by query
     */
    async search(searchQuery, limit = 30) {
        const result = await query(
            `SELECT 
                p.*,
                c.name as category_name,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'rating', r.rating,
                            'comment', r.comment,
                            'date', r.review_date,
                            'reviewerName', r.reviewer_name,
                            'reviewerEmail', r.reviewer_email
                        )
                    ) FILTER (WHERE r.id IS NOT NULL), 
                    '[]'
                ) as reviews
            FROM products p
            LEFT JOIN categories c ON p.category_slug = c.slug
            LEFT JOIN reviews r ON p.id = r.product_id
            WHERE 
                p.title ILIKE $1 OR 
                p.description ILIKE $1 OR 
                p.brand ILIKE $1 OR
                p.category_slug ILIKE $1
            GROUP BY p.id, c.name
            ORDER BY p.id
            LIMIT $2`,
            [`%${searchQuery}%`, limit]
        );

        return {
            products: result.rows.map(formatProduct),
            total: result.rows.length,
            skip: 0,
            limit
        };
    },

    /**
     * Get products by category
     */
    async getByCategory(categorySlug, limit = 30, skip = 0) {
        const result = await query(
            `SELECT 
                p.*,
                c.name as category_name,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'rating', r.rating,
                            'comment', r.comment,
                            'date', r.review_date,
                            'reviewerName', r.reviewer_name,
                            'reviewerEmail', r.reviewer_email
                        )
                    ) FILTER (WHERE r.id IS NOT NULL), 
                    '[]'
                ) as reviews
            FROM products p
            LEFT JOIN categories c ON p.category_slug = c.slug
            LEFT JOIN reviews r ON p.id = r.product_id
            WHERE p.category_slug = $1
            GROUP BY p.id, c.name
            ORDER BY p.id
            LIMIT $2 OFFSET $3`,
            [categorySlug, limit, skip]
        );

        const countResult = await query(
            'SELECT COUNT(*) FROM products WHERE category_slug = $1',
            [categorySlug]
        );
        const total = parseInt(countResult.rows[0].count);

        return {
            products: result.rows.map(formatProduct),
            total,
            skip,
            limit
        };
    }
};

/**
 * Format database row to match DummyJSON API response format
 */
function formatProduct(row) {
    return {
        id: row.id,
        title: row.title,
        description: row.description,
        category: row.category_slug,
        price: parseFloat(row.price),
        discountPercentage: parseFloat(row.discount_percentage) || 0,
        rating: parseFloat(row.rating) || 0,
        stock: row.stock,
        tags: row.tags || [],
        brand: row.brand,
        sku: row.sku,
        weight: row.weight ? parseFloat(row.weight) : null,
        dimensions: row.dimensions,
        warrantyInformation: row.warranty_information,
        shippingInformation: row.shipping_information,
        availabilityStatus: row.availability_status,
        returnPolicy: row.return_policy,
        minimumOrderQuantity: row.minimum_order_quantity,
        meta: row.meta,
        thumbnail: row.thumbnail,
        images: row.images || [],
        reviews: row.reviews || []
    };
}

export default productModel;
