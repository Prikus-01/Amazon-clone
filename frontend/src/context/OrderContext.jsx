import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load orders from backend on mount
    useEffect(() => {
        const loadOrders = async () => {
            try {
                const ordersData = await api.getOrders();
                setOrders(ordersData);
            } catch (error) {
                console.error('Failed to load orders from backend:', error);
                // Fallback to localStorage
                const saved = localStorage.getItem('amazonOrders');
                setOrders(saved ? JSON.parse(saved) : []);
            } finally {
                setLoading(false);
            }
        };
        loadOrders();
    }, []);

    // Sync to localStorage as backup
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('amazonOrders', JSON.stringify(orders));
        }
    }, [orders, loading]);

    const placeOrder = async (orderData) => {
        try {
            const order = await api.placeOrder(orderData);
            setOrders(prev => [order, ...prev]);
            return order;
        } catch (error) {
            console.error('Failed to place order:', error);
            // Fallback to local order
            const order = {
                id: 'ORD-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
                ...orderData,
                status: 'Confirmed',
                date: new Date().toISOString(),
            };
            setOrders(prev => [order, ...prev]);
            return order;
        }
    };

    const getOrderById = useCallback(async (orderId) => {
        // First check local state
        const localOrder = orders.find(order => order.id === orderId);
        if (localOrder) return localOrder;

        // Try fetching from backend
        try {
            const order = await api.getOrder(orderId);
            return order;
        } catch (error) {
            console.error('Failed to fetch order:', error);
            return null;
        }
    }, [orders]);

    return (
        <OrderContext.Provider value={{
            orders,
            loading,
            placeOrder,
            getOrderById
        }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
}
