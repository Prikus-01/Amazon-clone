import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

function ProductCard({ product, compact = false }) {
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();

    const discountedPrice = product.price * (1 - (product.discountPercentage || 0) / 100);
    const inWishlist = isInWishlist(product.id);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
    };

    return (
        <Link
            to={`/product/${product.id}`}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 group relative flex flex-col"
        >
            {/* Wishlist Button */}
            <button
                onClick={handleWishlistToggle}
                className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:scale-110 transition-transform"
            >
                <i className={`${inWishlist ? 'fa-solid text-red-500' : 'fa-regular text-gray-400'} fa-heart`}></i>
            </button>

            {/* Discount Badge */}
            {product.discountPercentage > 5 && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {Math.round(product.discountPercentage)}% OFF
                </div>
            )}

            {/* Product Image */}
            <div className="relative w-full h-48 bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-200"
                />
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm text-gray-900 font-medium line-clamp-2 mb-1 min-h-[40px]">
                    {product.title}
                </h3>

                {product.brand && (
                    <p className="text-xs text-gray-500 mb-1">by {product.brand}</p>
                )}

                <StarRating rating={product.rating} reviewCount={product.reviews?.length} />

                <div className="mt-2">
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-gray-900">
                            ${discountedPrice.toFixed(2)}
                        </span>
                        {product.discountPercentage > 0 && (
                            <span className="text-sm text-gray-500 line-through">
                                ${product.price.toFixed(2)}
                            </span>
                        )}
                    </div>
                </div>

                {/* Stock Status */}
                <p className={`text-xs mt-1 ${product.stock > 10 ? 'text-green-600' :
                    product.stock > 0 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                    {product.availabilityStatus || (product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock')}
                </p>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="mt-auto pt-3 w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 text-sm font-medium py-2 px-4 rounded-full transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Add to Cart
                </button>
            </div>
        </Link>
    );
}

export default ProductCard;
