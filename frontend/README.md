# Amazon Clone - E-Commerce Frontend

A fully functional e-commerce web application that replicates Amazon's design and user experience. Built with React.js, TailwindCSS, and the DummyJSON API.

![Amazon Clone](https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=300&fit=crop)

## 🚀 Features

### Core Features
- **Product Listing Page** - Grid layout with search and category filtering
- **Product Detail Page** - Image carousel, specifications, reviews
- **Shopping Cart** - Add/remove items, quantity controls, cart summary
- **Order Placement** - Checkout with shipping address form, order confirmation

### Bonus Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Order history
- ✅ Wishlist functionality
- ✅ Loading states and error handling
- ✅ LocalStorage persistence for cart, orders, and wishlist

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | Frontend framework |
| Vite | Build tool & dev server |
| TailwindCSS v4 | Styling |
| React Router DOM | Client-side routing |
| DummyJSON API | Product data |
| LocalStorage | State persistence |

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AddressForm.jsx
│   ├── CartItem.jsx
│   ├── CategoryFilter.jsx
│   ├── footer.jsx
│   ├── header.jsx
│   ├── ImageCarousel.jsx
│   ├── LoadingSpinner.jsx
│   ├── ProductCard.jsx
│   ├── ProductSkeleton.jsx
│   └── StarRating.jsx
├── context/             # React Context providers
│   ├── CartContext.jsx
│   ├── OrderContext.jsx
│   └── WishlistContext.jsx
├── pages/               # Page components
│   ├── CartPage.jsx
│   ├── CheckoutPage.jsx
│   ├── HomePage.jsx
│   ├── OrderConfirmationPage.jsx
│   ├── OrderHistoryPage.jsx
│   ├── ProductDetailPage.jsx
│   ├── ProductsPage.jsx
│   └── WishlistPage.jsx
├── services/            # API service layer
│   └── api.js
├── App.jsx              # Main app with routing
├── index.css            # Global styles
└── main.jsx             # Entry point
```

## 🔗 API Reference

This project uses the [DummyJSON Products API](https://dummyjson.com/docs/products):

| Endpoint | Description |
|----------|-------------|
| `GET /products` | Get all products (paginated) |
| `GET /products/:id` | Get single product |
| `GET /products/search?q=:query` | Search products |
| `GET /products/categories` | Get all categories |
| `GET /products/category/:category` | Get products by category |

## 📱 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Landing page with featured products |
| `/products` | ProductsPage | Product listing with search/filter |
| `/product/:id` | ProductDetailPage | Individual product details |
| `/cart` | CartPage | Shopping cart |
| `/checkout` | CheckoutPage | Checkout with address form |
| `/order-confirmation/:orderId` | OrderConfirmationPage | Order success page |
| `/orders` | OrderHistoryPage | View past orders |
| `/wishlist` | WishlistPage | Saved products |

## 🎨 Design Decisions

1. **No Authentication Required** - Default user assumed as per requirements
2. **LocalStorage Persistence** - Cart, orders, and wishlist persist across sessions
3. **Amazon UI Patterns** - Closely replicates Amazon's color scheme, layout, and interactions
4. **Responsive Design** - Optimized for mobile, tablet, and desktop viewports
5. **DummyJSON API** - Uses mock API for product data instead of PostgreSQL (frontend-only implementation)

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📝 Assumptions

1. This is a **frontend-only** implementation using DummyJSON API for demo data
2. No user authentication - assumes a default logged-in user
3. Orders and cart are stored in LocalStorage (not persisted to a backend)
4. Payment processing is simulated (no real transactions)

## 🚀 Deployment

Build the production bundle:
```bash
npm run build
```

The `dist` folder can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 📄 License

This project is for educational/interview purposes only.

---

Built with ❤️ for the SDE Intern Fullstack Assignment
