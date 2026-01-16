import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import StarRating from '../components/StarRating';

function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleMoveToCart = (product) => {
        addToCart(product);
        removeFromWishlist(product.id);
    };

    if (wishlist.length === 0) {
        return (
            <main className="bg-gray-100 min-h-screen py-8">
                <div className="max-w-[1000px] mx-auto px-4">
                    <h1 className="text-2xl font-medium text-gray-900 mb-6">Your Wishlist</h1>
                    <div className="bg-white rounded-lg p-8 text-center">
                        <i className="fa-regular fa-heart text-6xl text-gray-300 mb-4"></i>
                        <h2 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-600 mb-6">
                            Save items you love by clicking the heart icon on any product.
                        </p>
                        <Link
                            to="/products"
                            className="inline-block bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-medium py-2 px-6 rounded-full"
                        >
                            Discover products
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-[1000px] mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-medium text-gray-900">
                        Your Wishlist ({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})
                    </h1>
                </div>

                <div className="bg-white rounded-lg divide-y">
                    {wishlist.map((product) => {
                        const discountedPrice = product.price * (1 - (product.discountPercentage || 0) / 100);

                        return (
                            <div key={product.id} className="p-4 flex gap-4">
                                <Link to={`/product/${product.id}`} className="flex-shrink-0">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="w-32 h-32 object-contain bg-gray-50 rounded-lg hover:opacity-80 transition-opacity"
                                    />
                                </Link>

                                <div className="flex-1">
                                    <Link to={`/product/${product.id}`}>
                                        <h3 className="text-lg font-medium text-[#007185] hover:text-[#c7511f] hover:underline">
                                            {product.title}
                                        </h3>
                                    </Link>

                                    {product.brand && (
                                        <p className="text-sm text-gray-500 mt-1">by {product.brand}</p>
                                    )}

                                    <StarRating rating={product.rating} reviewCount={product.reviews?.length} />

                                    <div className="flex items-baseline gap-2 mt-2">
                                        <span className="text-xl font-bold text-gray-900">
                                            ${discountedPrice.toFixed(2)}
                                        </span>
                                        {product.discountPercentage > 0 && (
                                            <span className="text-sm text-gray-500 line-through">
                                                ${product.price.toFixed(2)}
                                            </span>
                                        )}
                                    </div>

                                    <p className={`text-sm mt-1 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </p>

                                    <div className="flex gap-3 mt-4">
                                        <button
                                            onClick={() => handleMoveToCart(product)}
                                            disabled={product.stock === 0}
                                            className="bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 text-sm font-medium py-2 px-6 rounded-full transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={() => removeFromWishlist(product.id)}
                                            className="text-[#007185] hover:text-[#c7511f] hover:underline text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

export default WishlistPage;
