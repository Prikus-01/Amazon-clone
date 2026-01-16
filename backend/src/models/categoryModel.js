import { query } from '../utils/database.js';

export const categoryModel = {
    /**
     * Get all categories with full details
     */
    async getAll() {
        const result = await query(
            `SELECT slug, name FROM categories ORDER BY name`
        );

        return result.rows.map(row => ({
            slug: row.slug,
            name: row.name,
            url: `https://localhost:3000/api/products/category/${row.slug}`
        }));
    },

    /**
     * Get category slugs only (list)
     */
    async getList() {
        const result = await query(
            `SELECT slug FROM categories ORDER BY slug`
        );

        return result.rows.map(row => row.slug);
    },

    /**
     * Get a single category by slug
     */
    async getBySlug(slug) {
        const result = await query(
            `SELECT slug, name FROM categories WHERE slug = $1`,
            [slug]
        );

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0];
    }
};

export default categoryModel;
