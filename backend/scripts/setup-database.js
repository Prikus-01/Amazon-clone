import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;

const pool = new Pool({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	ssl: {
			rejectUnauthorized: false
		}
});

async function setupDatabase() {
	console.log('🗄️  Setting up database...');

	try {
		// Read schema file
		const schemaPath = path.join(__dirname, '..', 'sql', 'schema.sql');
		const schema = fs.readFileSync(schemaPath, 'utf8');

		// Execute schema
		await pool.query(schema);

		console.log('✅ Database schema created successfully!');
		console.log('📋 Tables created:');
		console.log('   - users');
		console.log('   - categories');
		console.log('   - products');
		console.log('   - reviews');
		console.log('   - cart_items');
		console.log('   - wishlist_items');
		console.log('   - orders');
		console.log('   - order_items');
		console.log('');
		console.log('👤 Default user created (id: 1)');

	} catch (error) {
		console.error('❌ Error setting up database:', error.message);
		throw error;
	} finally {
		await pool.end();
	}
}

setupDatabase()
	.then(() => {
		console.log('\n🎉 Database setup complete!');
		console.log('Next step: Run "node scripts/seed-data.js" to seed products');
		process.exit(0);
	})
	.catch((error) => {
		console.error('Setup failed:', error);
		process.exit(1);
	});
