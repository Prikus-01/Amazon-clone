import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';

function OrderHistoryPage() {
    const { orders } = useOrders();

    if (orders.length === 0) {
        return (
            <main className="bg-gray-100 min-h-screen py-8">
                <div className="max-w-[1000px] mx-auto px-4">
                    <h1 className="text-2xl font-medium text-gray-900 mb-6">Your Orders</h1>
                    <div className="bg-white rounded-lg p-8 text-center">
                        <i className="fa-solid fa-box-open text-6xl text-gray-300 mb-4"></i>
                        <h2 className="text-xl font-medium text-gray-900 mb-2">No orders yet</h2>
                        <p className="text-gray-600 mb-6">
                            Looks like you haven't placed any orders. Start shopping to see your orders here.
                        </p>
                        <Link
                            to="/products"
                            className="inline-block bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-medium py-2 px-6 rounded-full"
                        >
                            Start shopping
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-[1000px] mx-auto px-4">
                <h1 className="text-2xl font-medium text-gray-900 mb-6">Your Orders</h1>

                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-lg overflow-hidden">
                            {/* Order Header */}
                            <div className="bg-gray-50 p-4 border-b flex flex-wrap gap-4 justify-between items-center text-sm">
                                <div className="flex flex-wrap gap-6">
                                    <div>
                                        <p className="text-gray-500 uppercase text-xs">Order placed</p>
                                        <p className="font-medium">
                                            {new Date(order.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 uppercase text-xs">Total</p>
                                        <p className="font-medium">${order.total.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 uppercase text-xs">Ship to</p>
                                        <p className="font-medium text-[#007185]">
                                            {order.shippingAddress.fullName}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-500 uppercase text-xs">Order #</p>
                                    <p className="font-medium text-[#007185]">{order.id}</p>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-green-600 font-medium">{order.status}</span>
                                    <span className="text-gray-500">•</span>
                                    <span className="text-gray-600">Delivered</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {order.items.slice(0, 4).map((item) => {
                                        const itemPrice = item.price * (1 - (item.discountPercentage || 0) / 100);
                                        return (
                                            <div key={item.id} className="flex gap-4">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    className="w-20 h-20 object-contain bg-gray-50 rounded border"
                                                />
                                                <div className="flex-1">
                                                    <Link
                                                        to={`/product/${item.id}`}
                                                        className="text-[#007185] hover:text-[#c7511f] hover:underline font-medium text-sm line-clamp-2"
                                                    >
                                                        {item.title}
                                                    </Link>
                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                    <p className="text-sm font-medium mt-1">
                                                        ${(itemPrice * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {order.items.length > 4 && (
                                    <p className="text-sm text-gray-500 mt-4">
                                        + {order.items.length - 4} more item(s)
                                    </p>
                                )}

                                <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t">
                                    <Link
                                        to={`/order-confirmation/${order.id}`}
                                        className="text-sm text-[#007185] hover:text-[#c7511f] hover:underline"
                                    >
                                        View order details
                                    </Link>
                                    <span className="text-gray-300">|</span>
                                    <button className="text-sm text-[#007185] hover:text-[#c7511f] hover:underline">
                                        Track package
                                    </button>
                                    <span className="text-gray-300">|</span>
                                    <button className="text-sm text-[#007185] hover:text-[#c7511f] hover:underline">
                                        Write a review
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default OrderHistoryPage;
