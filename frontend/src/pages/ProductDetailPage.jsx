import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import ImageCarousel from '../components/ImageCarousel';
import ProductCarousel from '../components/ProductCarousel';
import StarRating from '../components/StarRating';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();

    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const data = await api.getProduct(id);
                setProduct(data);

                // Fetch similar products from the same category
                if (data.category) {
                    const categoryProducts = await api.getProductsByCategory(data.category, 15);
                    // Filter out the current product and limit to 12 items
                    const filtered = (categoryProducts.products || categoryProducts)
                        .filter(p => p.id !== parseInt(id))
                        .slice(0, 12);
                    setSimilarProducts(filtered);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <i className="fa-solid fa-exclamation-circle text-6xl text-gray-300 mb-4"></i>
                <h1 className="text-2xl font-medium text-gray-900 mb-2">Product not found</h1>
                <button
                    onClick={() => navigate('/products')}
                    className="text-[#007185] hover:text-[#c7511f] hover:underline"
                >
                    Continue shopping
                </button>
            </div>
        );
    }

    const discountedPrice = product.price * (1 - (product.discountPercentage || 0) / 100);
    const inWishlist = isInWishlist(product.id);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const handleBuyNow = () => {
        addToCart(product, quantity);
        navigate('/cart');
    };

    return (
        <main className="bg-white min-h-screen">
            <div className="max-w-[1500px] mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-500 mb-6">
                    <span className="hover:text-[#c7511f] cursor-pointer" onClick={() => navigate('/')}>Home</span>
                    <span className="mx-2">›</span>
                    <span className="hover:text-[#c7511f] cursor-pointer" onClick={() => navigate('/products')}>Products</span>
                    <span className="mx-2">›</span>
                    <span className="hover:text-[#c7511f] cursor-pointer" onClick={() => navigate(`/products?category=${product.category}`)}>
                        {product.category?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </span>
                    <span className="mx-2">›</span>
                    <span className="text-gray-900">{product.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Images */}
                    <div className="lg:col-span-5">
                        <ImageCarousel images={product.images} title={product.title} />
                    </div>

                    {/* Product Info */}
                    <div className="lg:col-span-4">
                        <h1 className="text-2xl font-medium text-gray-900 mb-2">{product.title}</h1>

                        {product.brand && (
                            <p className="text-sm text-[#007185] hover:text-[#c7511f] hover:underline cursor-pointer mb-2">
                                Visit the {product.brand} Store
                            </p>
                        )}

                        <div className="flex items-center gap-2 mb-4">
                            <StarRating rating={product.rating} reviewCount={product.reviews?.length} size="md" />
                            <span className="text-sm text-gray-500">|</span>
                            <span className="text-sm text-[#007185]">{product.reviews?.length || 0} ratings</span>
                        </div>

                        <hr className="mb-4" />

                        {/* Price */}
                        <div className="mb-4">
                            {product.discountPercentage > 0 && (
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-red-600 text-lg font-medium">
                                        -{Math.round(product.discountPercentage)}%
                                    </span>
                                    <span className="text-3xl font-light text-gray-900">
                                        ${discountedPrice.toFixed(2)}
                                    </span>
                                </div>
                            )}
                            {product.discountPercentage > 0 ? (
                                <p className="text-sm text-gray-500">
                                    List Price: <span className="line-through">${product.price.toFixed(2)}</span>
                                </p>
                            ) : (
                                <span className="text-3xl font-light text-gray-900">
                                    ${product.price.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Product Details */}
                        <div className="space-y-3 text-sm">
                            <p className="text-gray-700">{product.description}</p>

                            <hr />

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <p className="font-medium text-gray-500">Brand</p>
                                    <p className="text-gray-900">{product.brand || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-500">SKU</p>
                                    <p className="text-gray-900">{product.sku || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-500">Weight</p>
                                    <p className="text-gray-900">{product.weight ? `${product.weight} oz` : 'N/A'}</p>
                                </div>
                            </div>

                            {product.dimensions && (
                                <div>
                                    <p className="font-medium text-gray-500">Dimensions</p>
                                    <p className="text-gray-900">
                                        {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} inches
                                    </p>
                                </div>
                            )}

                            {product.warrantyInformation && (
                                <div>
                                    <p className="font-medium text-gray-500">Warranty</p>
                                    <p className="text-gray-900">{product.warrantyInformation}</p>
                                </div>
                            )}

                            {product.returnPolicy && (
                                <div>
                                    <p className="font-medium text-gray-500">Return Policy</p>
                                    <p className="text-gray-900">{product.returnPolicy}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Buy Box */}
                    <div className="lg:col-span-3">
                        <div className="border border-gray-300 rounded-lg p-4 sticky top-4">
                            <p className="text-2xl text-gray-900 mb-2">
                                ${discountedPrice.toFixed(2)}
                            </p>

                            <p className="text-sm text-gray-500 mb-2">
                                {product.shippingInformation || 'FREE delivery'}
                            </p>

                            <p className={`text-lg mb-4 ${product.stock > 10 ? 'text-green-600' :
                                product.stock > 0 ? 'text-orange-600' : 'text-red-600'
                                }`}>
                                {product.availabilityStatus || (product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left in stock` : 'Out of Stock')}
                            </p>

                            {product.stock > 0 && (
                                <>
                                    {/* Quantity Selector */}
                                    <div className="mb-4">
                                        <label className="text-sm text-gray-700">Qty:</label>
                                        <select
                                            value={quantity}
                                            onChange={(e) => setQuantity(Number(e.target.value))}
                                            className="ml-2 border border-gray-300 rounded-lg px-3 py-1 bg-gray-100"
                                        >
                                            {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Add to Cart */}
                                    <button
                                        onClick={handleAddToCart}
                                        className={`w-full py-2 px-4 rounded-full mb-2 transition-colors ${addedToCart
                                            ? 'bg-green-500 text-white'
                                            : 'bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900'
                                            }`}
                                    >
                                        {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                                    </button>

                                    {/* Buy Now */}
                                    <button
                                        onClick={handleBuyNow}
                                        className="w-full bg-[#ffa41c] hover:bg-[#fa8900] text-gray-900 py-2 px-4 rounded-full mb-4"
                                    >
                                        Buy Now
                                    </button>
                                </>
                            )}

                            {/* Wishlist */}
                            <button
                                onClick={() => toggleWishlist(product)}
                                className="w-full border border-gray-300 py-2 px-4 rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                            >
                                <i className={`${inWishlist ? 'fa-solid text-red-500' : 'fa-regular'} fa-heart`}></i>
                                {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                            </button>

                            <hr className="my-4" />

                            <div className="text-sm space-y-2">
                                <div className="flex items-start gap-2">
                                    <i className="fa-solid fa-lock text-gray-400 mt-0.5"></i>
                                    <span>Secure transaction</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <i className="fa-solid fa-truck text-gray-400 mt-0.5"></i>
                                    <span>Ships from Amazon</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <i className="fa-solid fa-store text-gray-400 mt-0.5"></i>
                                    <span>Sold by Amazon</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-4" />
                {/* Reviews Section */}
                {product.reviews && product.reviews.length > 0 && (
                    <div className="mt-12 w-[60%] mx-auto pt-8">
                        <h2 className="text-2xl font-medium text-gray-900 mb-6">Customer Reviews</h2>
                        <div className="flex flex-col">
                            {product.reviews.map((review, index) => (
                                <div key={index} className="py-5 border-b border-gray-200 last:border-b-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                            <i className="fa-solid fa-user text-gray-500 text-sm"></i>
                                        </div>
                                        <span className="text-sm text-gray-700">{review.reviewerName}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <StarRating rating={review.rating} />
                                        <span className="font-bold text-sm text-gray-900">{review.comment.substring(0, 50)}{review.comment.length > 50 ? '...' : ''}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-2">
                                        Reviewed on {new Date(review.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                    <p className="text-gray-800 text-sm leading-relaxed">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Similar Products Section */}
                {similarProducts.length > 0 && (
                    <div className="mt-12 border-t border-gray-200 pt-8">
                        <ProductCarousel
                            title={`Best Sellers in ${product.category?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`}
                            products={similarProducts}
                            seeAllLink={`/products?category=${product.category}`}
                            seeAllText="See all products"
                        />
                    </div>
                )}

            </div>
        </main>
    );
}

export default ProductDetailPage;
