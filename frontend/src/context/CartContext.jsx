import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load cart from backend on mount
    useEffect(() => {
        const loadCart = async () => {
            try {
                const cartData = await api.getCart();
                setCart(cartData);
            } catch (error) {
                console.error('Failed to load cart from backend:', error);
                // Fallback to localStorage
                const saved = localStorage.getItem('amazonCart');
                setCart(saved ? JSON.parse(saved) : []);
            } finally {
                setLoading(false);
            }
        };
        loadCart();
    }, []);

    // Sync to localStorage as backup
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('amazonCart', JSON.stringify(cart));
        }
    }, [cart, loading]);

    const addToCart = async (product, quantity = 1) => {
        try {
            const updatedCart = await api.addToCart(product.id, quantity);
            setCart(updatedCart);
        } catch (error) {
            console.error('Failed to add to cart:', error);
            // Fallback to local state
            setCart(prev => {
                const existing = prev.find(item => item.id === product.id);
                if (existing) {
                    return prev.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    );
                }
                return [...prev, { ...product, quantity }];
            });
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const updatedCart = await api.removeFromCart(productId);
            setCart(updatedCart);
        } catch (error) {
            console.error('Failed to remove from cart:', error);
            setCart(prev => prev.filter(item => item.id !== productId));
        }
    };

    const updateQuantity = async (productId, quantity) => {
        if (quantity <= 0) {
            return removeFromCart(productId);
        }
        try {
            const updatedCart = await api.updateCartQuantity(productId, quantity);
            setCart(updatedCart);
        } catch (error) {
            console.error('Failed to update quantity:', error);
            setCart(prev =>
                prev.map(item =>
                    item.id === productId ? { ...item, quantity } : item
                )
            );
        }
    };

    const clearCart = async () => {
        try {
            await api.clearCart();
            setCart([]);
        } catch (error) {
            console.error('Failed to clear cart:', error);
            setCart([]);
        }
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => {
            const discountedPrice = item.price * (1 - (item.discountPercentage || 0) / 100);
            return total + discountedPrice * item.quantity;
        }, 0);
    };

    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cart,
            loading,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            getCartCount
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
