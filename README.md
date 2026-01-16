# 🛒 Amazon Clone - Full-Stack E-Commerce Platform

A full-stack e-commerce web application that replicates Amazon's design and user experience. Built with React.js frontend, Node.js/Express.js backend, and PostgreSQL database.

![Amazon Clone](https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=300&fit=crop)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [API Reference](#-api-reference)
- [Frontend Routes](#-frontend-routes)
- [Database Schema](#-database-schema)
- [Assumptions](#-assumptions)
- [Author](#-author)

---

## ✨ Features

### Core Features
| Feature | Description |
|---------|-------------|
| 🛍️ Product Listing | Grid layout with search and category filtering |
| 📦 Product Details | Image carousel, specifications, reviews, similar products |
| 🛒 Shopping Cart | Add/remove items, quantity controls, cart summary |
| 📝 Checkout | Shipping address form with validation |
| ✅ Order Placement | Order confirmation with order details |

### Bonus Features
- ✅ **Responsive Design** - Mobile, tablet, and desktop optimized
- ✅ **Wishlist** - Save products for later
- ✅ **Order History** - View past orders
- ✅ **Loading States** - Skeleton loaders and spinners
- ✅ **Error Handling** - Graceful error messages

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI Framework |
| Vite | 7.2.4 | Build Tool & Dev Server |
| TailwindCSS | 4.1.18 | Styling |
| React Router DOM | 7.12.0 | Client-side Routing |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime Environment |
| Express.js | 5.2.1 | Web Framework |
| PostgreSQL | 14+ | Database |
| pg | 8.17.1 | PostgreSQL Client |

---

## 📁 Project Structure

```
amazon-clone/
├── 📂 backend/
│   ├── app.js                 # Express app entry point
│   ├── package.json
│   ├── .env                   # Environment variables
│   ├── 📂 scripts/
│   │   ├── setup-database.js  # DB schema setup
│   │   └── seed-data.js       # Seed products from DummyJSON
│   ├── 📂 sql/
│   │   └── schema.sql         # PostgreSQL schema
│   └── 📂 src/
│       ├── controllers/       # Request handlers
│       ├── models/            # Database queries
│       ├── routes/            # API routes
│       └── utils/             # Database connection
│
└── 📂 frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── 📂 src/
        ├── 📂 components/     # Reusable UI components
        │   ├── AddressForm.jsx
        │   ├── CartItem.jsx
        │   ├── CategoryFilter.jsx
        │   ├── HeroCarousel.jsx
        │   ├── ImageCarousel.jsx
        │   ├── ProductCard.jsx
        │   ├── StarRating.jsx
        │   └── ...
        ├── 📂 context/        # React Context providers
        │   ├── CartContext.jsx
        │   ├── OrderContext.jsx
        │   └── WishlistContext.jsx
        ├── 📂 pages/          # Page components
        │   ├── HomePage.jsx
        │   ├── ProductsPage.jsx
        │   ├── ProductDetailPage.jsx
        │   ├── CartPage.jsx
        │   ├── CheckoutPage.jsx
        │   └── ...
        └── 📂 services/       # API service layer
            └── api.js
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** package manager

---

## 🚀 Installation & Setup

### Step 1: Database Setup

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database and user
CREATE DATABASE amazon;
CREATE USER amazon_user WITH PASSWORD 'qwerty';
GRANT ALL PRIVILEGES ON DATABASE amazon TO amazon_user;
\q
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Setup database tables
npm run setup:db

# Seed products from DummyJSON API (~194 products)
npm run seed

# Start development server
npm run dev
```

> 📍 Backend runs at: `http://localhost:3000`

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

> 📍 Frontend runs at: `http://localhost:5173`

---

## 🔌 API Reference

### Products API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all products (pagination: `limit`, `skip`) |
| `GET` | `/api/products/:id` | Get product by ID |
| `GET` | `/api/products/search?q=` | Search products |
| `GET` | `/api/products/category/:slug` | Get products by category |
| `GET` | `/api/products/categories` | Get all categories |
| `GET` | `/api/products/category-list` | Get category slugs |

### Cart API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/cart` | Get cart items |
| `POST` | `/api/cart` | Add item to cart |
| `PUT` | `/api/cart/:productId` | Update item quantity |
| `DELETE` | `/api/cart/:productId` | Remove item from cart |
| `DELETE` | `/api/cart` | Clear entire cart |

### Wishlist API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/wishlist` | Get wishlist items |
| `POST` | `/api/wishlist` | Add to wishlist |
| `DELETE` | `/api/wishlist/:productId` | Remove from wishlist |

### Orders API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/orders` | Get all orders |
| `GET` | `/api/orders/:id` | Get order by ID |
| `POST` | `/api/orders` | Place new order |

---

## 🗺️ Frontend Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Landing page with hero carousel & featured products |
| `/products` | ProductsPage | Product listing with search & category filter |
| `/product/:id` | ProductDetailPage | Product details, reviews, similar products |
| `/cart` | CartPage | Shopping cart with quantity controls |
| `/checkout` | CheckoutPage | Checkout with shipping address form |
| `/order-confirmation/:id` | OrderConfirmationPage | Order success page |
| `/orders` | OrderHistoryPage | View past orders |
| `/wishlist` | WishlistPage | Saved products |

---

## 🗄️ Database Schema

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

---

## 📝 Assumptions

1. **No Authentication** - A default user (ID: 1) is used for all operations
2. **Product Data** - Products are seeded from DummyJSON API (~194 products across 24 categories)
3. **Stock Management** - Stock is tracked but not decremented on purchase
4. **Payment** - Payment processing is simulated (no real transactions)

---

## 🔧 Available Scripts

### Backend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with nodemon |
| `npm start` | Start production server |
| `npm run setup:db` | Create database tables |
| `npm run seed` | Seed products from DummyJSON API |

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🚀 Deployment

### Frontend
```bash
cd frontend
npm run build
```
Deploy the `dist` folder to: Vercel, Netlify, or GitHub Pages

### Backend
Deploy to: AWS EC2, Heroku, Railway, or Render
- Configure production environment variables
- Enable SSL for PostgreSQL connection

---

## 👤 Author

**Priyanshu**

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

---

<div align="center">
  Built with ❤️ using React, Node.js & PostgreSQL
</div>
