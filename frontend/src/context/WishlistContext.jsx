import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load wishlist from backend on mount
    useEffect(() => {
        const loadWishlist = async () => {
            try {
                const wishlistData = await api.getWishlist();
                setWishlist(wishlistData);
            } catch (error) {
                console.error('Failed to load wishlist from backend:', error);
                // Fallback to localStorage
                const saved = localStorage.getItem('amazonWishlist');
                setWishlist(saved ? JSON.parse(saved) : []);
            } finally {
                setLoading(false);
            }
        };
        loadWishlist();
    }, []);

    // Sync to localStorage as backup
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('amazonWishlist', JSON.stringify(wishlist));
        }
    }, [wishlist, loading]);

    const addToWishlist = async (product) => {
        try {
            const updatedWishlist = await api.addToWishlist(product.id);
            setWishlist(updatedWishlist);
        } catch (error) {
            console.error('Failed to add to wishlist:', error);
            // Fallback to local state
            setWishlist(prev => {
                if (prev.find(item => item.id === product.id)) {
                    return prev;
                }
                return [...prev, product];
            });
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            const updatedWishlist = await api.removeFromWishlist(productId);
            setWishlist(updatedWishlist);
        } catch (error) {
            console.error('Failed to remove from wishlist:', error);
            setWishlist(prev => prev.filter(item => item.id !== productId));
        }
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => item.id === productId);
    };

    const toggleWishlist = async (product) => {
        if (isInWishlist(product.id)) {
            await removeFromWishlist(product.id);
        } else {
            await addToWishlist(product);
        }
    };

    return (
        <WishlistContext.Provider value={{
            wishlist,
            loading,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            toggleWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
