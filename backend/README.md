# Amazon Clone - E-Commerce Platform

A full-stack e-commerce web application that replicates Amazon's design and user experience. Built with React.js frontend, Node.js/Express.js backend, and PostgreSQL database.

## Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **pg** - PostgreSQL client for Node.js

## Features

### Core Features
- ✅ Product listing with grid layout
- ✅ Product search functionality
- ✅ Category filtering
- ✅ Product detail page with image carousel
- ✅ Shopping cart (add, update, remove items)
- ✅ Checkout with shipping address form
- ✅ Order placement and confirmation
- ✅ Order history

### Bonus Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Wishlist functionality
- ✅ Order history page

## Database Schema

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   users     │     │  categories │     │  products   │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id          │     │ id          │     │ id          │
│ username    │     │ slug        │     │ title       │
│ email       │     │ name        │     │ description │
│ full_name   │     └─────────────┘     │ price       │
└─────────────┘            │            │ category    │
      │                    └────────────│ stock       │
      │                                 │ images      │
      │                                 └─────────────┘
      │                                       │
      ▼                                       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ cart_items  │     │  wishlist   │     │   reviews   │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ user_id     │     │ user_id     │     │ product_id  │
│ product_id  │     │ product_id  │     │ rating      │
│ quantity    │     └─────────────┘     │ comment     │
└─────────────┘                         └─────────────┘
      │
      ▼
┌─────────────┐     ┌─────────────┐
│   orders    │────▶│ order_items │
├─────────────┤     ├─────────────┤
│ id          │     │ order_id    │
│ user_id     │     │ product_id  │
│ status      │     │ quantity    │
│ total       │     │ price       │
│ shipping_*  │     └─────────────┘
└─────────────┘
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### 1. Database Setup

```bash
# Create PostgreSQL database and user
psql -U postgres

CREATE DATABASE amazon;
CREATE USER amazon_user WITH PASSWORD 'qwerty';
GRANT ALL PRIVILEGES ON DATABASE amazon TO amazon_user;
\q
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables (already set in .env)
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=amazon
# DB_USER=amazon_user
# DB_PASSWORD=qwerty

# Create database tables
npm run setup:db

# Seed products from DummyJSON API
npm run seed

# Start the server
npm run dev
```

The backend will be available at `http://localhost:3000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (pagination: `limit`, `skip`) |
| GET | `/api/products/:id` | Get product by ID |
| GET | `/api/products/search?q=` | Search products |
| GET | `/api/products/category/:slug` | Get products by category |
| GET | `/api/products/categories` | Get all categories |
| GET | `/api/products/category-list` | Get category slugs |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get cart items |
| POST | `/api/cart` | Add to cart |
| PUT | `/api/cart/:productId` | Update quantity |
| DELETE | `/api/cart/:productId` | Remove item |
| DELETE | `/api/cart` | Clear cart |

### Wishlist
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/wishlist` | Get wishlist |
| POST | `/api/wishlist` | Add to wishlist |
| DELETE | `/api/wishlist/:productId` | Remove from wishlist |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders/:id` | Get order by ID |
| POST | `/api/orders` | Place new order |

## Project Structure

```
amazon-clone/
├── backend/
│   ├── app.js                 # Express app entry point
│   ├── package.json
│   ├── .env                   # Environment variables
│   ├── scripts/
│   │   ├── setup-database.js  # DB schema setup
│   │   └── seed-data.js       # Seed products from DummyJSON
│   ├── sql/
│   │   └── schema.sql         # PostgreSQL schema
│   └── src/
│       ├── controllers/       # Request handlers
│       ├── models/            # Database queries
│       ├── routes/            # API routes
│       └── utils/             # Database connection
│
└── frontend/
    ├── src/
    │   ├── components/        # Reusable UI components
    │   ├── context/           # React context providers
    │   ├── pages/             # Page components
    │   └── services/          # API service
    ├── index.html
    └── package.json
```

## Assumptions

1. **No Authentication**: A default user (ID: 1) is used for all operations as authentication is not required for this assignment.

2. **Product Data**: Products are seeded from DummyJSON API with ~194 products across 24 categories.

3. **Stock Management**: Stock is tracked but not decremented on purchase (can be added as enhancement).

4. **Payment**: Payment processing is simulated - no actual payment integration.

## Screenshots

[Add screenshots of your application here]

## Author

Priyanshu

## License

MIT
