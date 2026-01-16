import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

function CartPage() {
    const { cart, getCartTotal, getCartCount, clearCart } = useCart();
    const navigate = useNavigate();

    const subtotal = getCartTotal();
    const itemCount = getCartCount();

    if (cart.length === 0) {
        return (
            <main className="bg-gray-100 min-h-screen py-8">
                <div className="max-w-[1200px] mx-auto px-4">
                    <div className="bg-white rounded-lg p-8 text-center">
                        <div className="w-24 h-24 mx-auto mb-6">
                            <img
                                src="https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB445243794_.svg"
                                alt="Empty cart"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <h1 className="text-2xl font-medium text-gray-900 mb-2">Your Amazon Cart is empty</h1>
                        <p className="text-gray-600 mb-6">
                            Your shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies, electronics, and more.
                        </p>
                        <Link
                            to="/products"
                            className="inline-block bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-medium py-2 px-6 rounded-full transition-colors"
                        >
                            Continue shopping
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-[1200px] mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Cart Items */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h1 className="text-2xl font-medium text-gray-900">Shopping Cart</h1>
                                <button
                                    onClick={clearCart}
                                    className="text-sm text-[#007185] hover:text-[#c7511f] hover:underline"
                                >
                                    Delete all items
                                </button>
                            </div>

                            <p className="text-sm text-gray-500 text-right border-b pb-2 mb-4">Price</p>

                            <div className="divide-y">
                                {cart.map((item) => (
                                    <CartItem key={item.id} item={item} />
                                ))}
                            </div>

                            <div className="text-right mt-4 text-lg">
                                Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'}):
                                <span className="font-bold ml-2">${subtotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg p-6 sticky top-4">
                            <div className="flex items-center gap-2 text-green-600 text-sm mb-4">
                                <i className="fa-solid fa-check-circle"></i>
                                <span>Your order qualifies for FREE Shipping</span>
                            </div>

                            <p className="text-lg mb-4">
                                Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'}):
                                <span className="font-bold ml-2">${subtotal.toFixed(2)}</span>
                            </p>

                            <label className="flex items-start gap-2 text-sm mb-4 cursor-pointer">
                                <input type="checkbox" className="mt-1" />
                                <span>This order contains a gift</span>
                            </label>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-medium py-3 px-4 rounded-full transition-colors"
                            >
                                Proceed to checkout
                            </button>
                        </div>

                        {/* Related Products Suggestion */}
                        <div className="bg-white rounded-lg p-4 mt-4">
                            <h3 className="font-medium text-gray-900 mb-2">Customers who bought items in your cart also bought</h3>
                            <Link to="/products" className="text-sm text-[#007185] hover:text-[#c7511f] hover:underline">
                                See more
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default CartPage;
