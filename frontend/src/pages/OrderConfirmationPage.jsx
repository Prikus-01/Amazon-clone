import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import LoadingSpinner from '../components/LoadingSpinner';

function OrderConfirmationPage() {
    const { orderId } = useParams();
    const { getOrderById } = useOrders();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrder = async () => {
            if (orderId && orderId !== 'undefined') {
                const orderData = await getOrderById(orderId);
                setOrder(orderData);
            }
            setLoading(false);
        };
        loadOrder();
    }, [orderId, getOrderById]);

    if (loading) {
        return (
            <main className="bg-gray-100 min-h-screen py-8">
                <div className="max-w-[800px] mx-auto px-4 text-center">
                    <LoadingSpinner size="lg" />
                    <p className="mt-4 text-gray-600">Loading order details...</p>
                </div>
            </main>
        );
    }

    if (!order) {
        return (
            <main className="bg-gray-100 min-h-screen py-8">
                <div className="max-w-[800px] mx-auto px-4 text-center">
                    <i className="fa-solid fa-exclamation-circle text-6xl text-gray-300 mb-4"></i>
                    <h1 className="text-2xl font-medium text-gray-900 mb-4">Order not found</h1>
                    <Link
                        to="/orders"
                        className="text-[#007185] hover:text-[#c7511f] hover:underline"
                    >
                        View your orders
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-[800px] mx-auto px-4">
                {/* Success Message */}
                <div className="bg-white rounded-lg p-8 text-center mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fa-solid fa-check text-green-500 text-4xl"></i>
                    </div>
                    <h1 className="text-2xl font-medium text-gray-900 mb-2">
                        Order placed, thank you!
                    </h1>
                    <p className="text-gray-600 mb-4">
                        Confirmation will be sent to your email.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 inline-block">
                        <p className="text-sm text-gray-500">Order number</p>
                        <p className="text-lg font-medium text-[#007185]">{order.id}</p>
                    </div>
                </div>

                {/* Order Details */}
                <div className="bg-white rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-medium text-gray-900 mb-4">Order Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Shipping address</h3>
                            <div className="text-sm text-gray-700">
                                <p className="font-medium">{order.shippingAddress?.fullName}</p>
                                <p>{order.shippingAddress?.addressLine1}</p>
                                {order.shippingAddress?.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                                <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}</p>
                                <p>{order.shippingAddress?.country}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Order summary</h3>
                            <div className="text-sm space-y-1">
                                <div className="flex justify-between">
                                    <span>Items:</span>
                                    <span>${order.subtotal?.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping:</span>
                                    <span className="text-green-600">FREE</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax:</span>
                                    <span>${order.tax?.toFixed(2)}</span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total:</span>
                                    <span>${order.total?.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-medium text-gray-900 mb-4">
                        Items in your order
                    </h2>

                    <div className="border rounded-lg p-4">
                        <p className="text-green-600 font-medium mb-4">
                            <i className="fa-solid fa-truck mr-2"></i>
                            Arriving in 3-5 business days
                        </p>

                        <div className="divide-y">
                            {order.items?.map((item) => {
                                const itemPrice = item.price * (1 - (item.discountPercentage || 0) / 100);
                                return (
                                    <div key={item.id} className="flex gap-4 py-4">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-20 h-20 object-contain bg-gray-50 rounded"
                                        />
                                        <div className="flex-1">
                                            <Link
                                                to={`/product/${item.id}`}
                                                className="text-[#007185] hover:text-[#c7511f] hover:underline font-medium"
                                            >
                                                {item.title}
                                            </Link>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            <p className="text-lg font-bold mt-1">
                                                ${(itemPrice * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/orders"
                        className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 font-medium py-3 px-8 rounded-full text-center transition-colors"
                    >
                        View order history
                    </Link>
                    <Link
                        to="/products"
                        className="bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-medium py-3 px-8 rounded-full text-center transition-colors"
                    >
                        Continue shopping
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default OrderConfirmationPage;
