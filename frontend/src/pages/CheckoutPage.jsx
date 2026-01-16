import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import AddressForm from '../components/AddressForm';

function CheckoutPage() {
    const { cart, getCartTotal, getCartCount, clearCart } = useCart();
    const { placeOrder } = useOrders();
    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [step, setStep] = useState('address'); // 'address' | 'review'

    const subtotal = getCartTotal();
    const itemCount = getCartCount();
    const shipping = 0; // Free shipping
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    if (cart.length === 0) {
        return (
            <main className="bg-gray-100 min-h-screen py-8">
                <div className="max-w-[800px] mx-auto px-4 text-center">
                    <i className="fa-solid fa-cart-shopping text-6xl text-gray-300 mb-4"></i>
                    <h1 className="text-2xl font-medium text-gray-900 mb-4">Your cart is empty</h1>
                    <Link
                        to="/products"
                        className="inline-block bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-medium py-2 px-6 rounded-full"
                    >
                        Continue shopping
                    </Link>
                </div>
            </main>
        );
    }

    const handleAddressSubmit = (address) => {
        setShippingAddress(address);
        setStep('review');
        localStorage.setItem('shippingAddress', JSON.stringify(address));
    };

    const handlePlaceOrder = async () => {
        setIsProcessing(true);

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const order = await placeOrder({
            items: cart,
            shippingAddress,
            subtotal,
            shipping,
            tax,
            total,
        });

        clearCart();
        navigate(`/order-confirmation/${order.id}`);
    };

    return (
        <main className="bg-gray-100 min-h-screen">
            {/* Checkout Header */}
            <div className="bg-white border-b shadow-sm mb-6">
                <div className="max-w-[1000px] mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20240326183545/amazon.png"
                            alt="Amazon"
                            className="h-8"
                        />
                    </Link>
                    <h1 className="text-2xl font-medium text-gray-900">Checkout</h1>
                    <i className="fa-solid fa-lock text-gray-400"></i>
                </div>
            </div>

            <div className="max-w-[1000px] mx-auto px-4 pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {step === 'address' ? (
                            <div className="bg-white rounded-lg p-6">
                                <h2 className="text-xl font-medium text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-[#131921] text-white rounded-full flex items-center justify-center text-sm">1</span>
                                    Shipping address
                                </h2>
                                <AddressForm onSubmit={handleAddressSubmit} />
                            </div>
                        ) : (
                            <>
                                {/* Shipping Address Summary */}
                                <div className="bg-white rounded-lg p-6 mb-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-medium text-gray-900 flex items-center gap-2">
                                            <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">
                                                <i className="fa-solid fa-check"></i>
                                            </span>
                                            Shipping address
                                        </h2>
                                        <button
                                            onClick={() => setStep('address')}
                                            className="text-[#007185] hover:text-[#c7511f] hover:underline text-sm"
                                        >
                                            Change
                                        </button>
                                    </div>
                                    <div className="text-sm text-gray-700 ml-10">
                                        <p className="font-medium">{shippingAddress.fullName}</p>
                                        <p>{shippingAddress.addressLine1}</p>
                                        {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
                                        <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                                        <p>{shippingAddress.country}</p>
                                        <p>Phone: {shippingAddress.phone}</p>
                                    </div>
                                </div>

                                {/* Order Review */}
                                <div className="bg-white rounded-lg p-6">
                                    <h2 className="text-xl font-medium text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="w-8 h-8 bg-[#131921] text-white rounded-full flex items-center justify-center text-sm">2</span>
                                        Review items and delivery
                                    </h2>

                                    <div className="border rounded-lg p-4">
                                        <p className="text-green-600 font-medium mb-2">
                                            Arriving in 3-5 business days
                                        </p>
                                        <div className="divide-y">
                                            {cart.map((item) => {
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
                            </>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg p-6 sticky top-4">
                            {step === 'review' && (
                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={isProcessing}
                                    className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-medium py-3 px-4 rounded-full transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isProcessing ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        'Place your order'
                                    )}
                                </button>
                            )}

                            <p className="text-xs text-gray-500 mb-4">
                                By placing your order, you agree to Amazon's privacy notice and conditions of use.
                            </p>

                            <hr className="mb-4" />

                            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Items ({itemCount}):</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping & handling:</span>
                                    <span className="text-green-600">FREE</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Estimated tax:</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div className="flex justify-between text-lg font-bold text-red-700">
                                <span>Order total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default CheckoutPage;
