import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function CartItem({ item }) {
    const { updateQuantity, removeFromCart } = useCart();

    const discountedPrice = item.price * (1 - (item.discountPercentage || 0) / 100);
    const itemTotal = discountedPrice * item.quantity;

    return (
        <div className="flex gap-4 py-4 border-b border-gray-200">
            {/* Product Image */}
            <Link to={`/product/${item.id}`} className="flex-shrink-0">
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-32 h-32 object-contain bg-gray-50 rounded-lg hover:opacity-80 transition-opacity"
                />
            </Link>

            {/* Product Details */}
            <div className="flex-1">
                <Link to={`/product/${item.id}`}>
                    <h3 className="text-lg font-medium text-gray-900 hover:text-[#c7511f] transition-colors line-clamp-2">
                        {item.title}
                    </h3>
                </Link>

                {item.brand && (
                    <p className="text-sm text-gray-500 mt-1">by {item.brand}</p>
                )}

                <p className={`text-sm mt-1 ${item.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors text-lg font-medium"
                        >
                            −
                        </button>
                        <span className="px-4 py-1 text-center min-w-[50px] bg-white border-x border-gray-300">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors text-lg font-medium"
                        >
                            +
                        </button>
                    </div>

                    <span className="text-gray-300">|</span>

                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#007185] hover:text-[#c7511f] hover:underline text-sm"
                    >
                        Delete
                    </button>

                    <span className="text-gray-300">|</span>

                    <button className="text-[#007185] hover:text-[#c7511f] hover:underline text-sm">
                        Save for later
                    </button>
                </div>
            </div>

            {/* Price */}
            <div className="flex-shrink-0 text-right">
                <p className="text-lg font-bold text-gray-900">
                    ${itemTotal.toFixed(2)}
                </p>
                {item.discountPercentage > 0 && (
                    <p className="text-sm text-gray-500 line-through">
                        ${(item.price * item.quantity).toFixed(2)}
                    </p>
                )}
            </div>
        </div>
    );
}

export default CartItem;
