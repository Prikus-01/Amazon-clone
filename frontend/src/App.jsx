import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/header';
import Footer from './components/footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import WishlistPage from './pages/WishlistPage';
import './App.css';

function App() {
  return (
    <Router>
      <CartProvider>
        <OrderProvider>
          <WishlistProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                  <Route path="/orders" element={<OrderHistoryPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </WishlistProvider>
        </OrderProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
