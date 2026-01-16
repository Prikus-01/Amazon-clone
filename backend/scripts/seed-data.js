import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const DUMMYJSON_BASE = 'https://dummyjson.com';

async function fetchFromDummyJSON(endpoint) {
    const response = await fetch(`${DUMMYJSON_BASE}${endpoint}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
    }
    return response.json();
}

async function seedCategories() {
    console.log('📁 Seeding categories...');

    const categories = await fetchFromDummyJSON('/products/categories');

    for (const category of categories) {
        await pool.query(
            `INSERT INTO categories (slug, name) VALUES ($1, $2) ON CONFLICT (slug) DO NOTHING`,
            [category.slug, category.name]
        );
    }

    console.log(`   ✅ Inserted ${categories.length} categories`);
}

async function seedProducts() {
    console.log('📦 Seeding products...');

    // Fetch all products (limit=0 returns all)
    const data = await fetchFromDummyJSON('/products?limit=0');
    const products = data.products;

    console.log(`   Found ${products.length} products to insert...`);

    let insertedCount = 0;

    for (const product of products) {
        try {
            // Insert product
            await pool.query(
                `INSERT INTO products (
                    id, title, description, category_slug, price, discount_percentage,
                    rating, stock, tags, brand, sku, weight, dimensions,
                    warranty_information, shipping_information, availability_status,
                    return_policy, minimum_order_quantity, meta, thumbnail, images
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
                ON CONFLICT (id) DO UPDATE SET
                    title = EXCLUDED.title,
                    description = EXCLUDED.description,
                    price = EXCLUDED.price,
                    stock = EXCLUDED.stock,
                    updated_at = CURRENT_TIMESTAMP`,
                [
                    product.id,
                    product.title,
                    product.description,
                    product.category,
                    product.price,
                    product.discountPercentage || 0,
                    product.rating || 0,
                    product.stock || 0,
                    product.tags || [],
                    product.brand || null,
                    product.sku || null,
                    product.weight || null,
                    product.dimensions ? JSON.stringify(product.dimensions) : null,
                    product.warrantyInformation || null,
                    product.shippingInformation || null,
                    product.availabilityStatus || 'In Stock',
                    product.returnPolicy || null,
                    product.minimumOrderQuantity || 1,
                    product.meta ? JSON.stringify(product.meta) : null,
                    product.thumbnail || null,
                    product.images || []
                ]
            );

            // Insert reviews for this product
            if (product.reviews && product.reviews.length > 0) {
                for (const review of product.reviews) {
                    await pool.query(
                        `INSERT INTO reviews (product_id, rating, comment, reviewer_name, reviewer_email, review_date)
                         VALUES ($1, $2, $3, $4, $5, $6)
                         ON CONFLICT DO NOTHING`,
                        [
                            product.id,
                            review.rating,
                            review.comment,
                            review.reviewerName,
                            review.reviewerEmail,
                            review.date ? new Date(review.date) : new Date()
                        ]
                    );
                }
            }

            insertedCount++;

            if (insertedCount % 20 === 0) {
                console.log(`   Processed ${insertedCount}/${products.length} products...`);
            }
        } catch (error) {
            console.error(`   ⚠️  Error inserting product ${product.id}:`, error.message);
        }
    }

    console.log(`   ✅ Inserted ${insertedCount} products with reviews`);
}

async function resetSequence() {
    // Reset the product ID sequence to continue after the last inserted ID
    await pool.query(`SELECT setval('products_id_seq', (SELECT MAX(id) FROM products))`);
    console.log('   ✅ Reset product ID sequence');
}

async function seedData() {
    console.log('🌱 Starting data seeding from DummyJSON...\n');

    try {
        await seedCategories();
        await seedProducts();
        await resetSequence();

        // Show summary
        const categoryCount = await pool.query('SELECT COUNT(*) FROM categories');
        const productCount = await pool.query('SELECT COUNT(*) FROM products');
        const reviewCount = await pool.query('SELECT COUNT(*) FROM reviews');

        console.log('\n📊 Database Summary:');
        console.log(`   Categories: ${categoryCount.rows[0].count}`);
        console.log(`   Products: ${productCount.rows[0].count}`);
        console.log(`   Reviews: ${reviewCount.rows[0].count}`);

    } catch (error) {
        console.error('❌ Error seeding data:', error.message);
        throw error;
    } finally {
        await pool.end();
    }
}

seedData()
    .then(() => {
        console.log('\n🎉 Data seeding complete!');
        console.log('You can now start the backend with: npm run dev');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Seeding failed:', error);
        process.exit(1);
    });
