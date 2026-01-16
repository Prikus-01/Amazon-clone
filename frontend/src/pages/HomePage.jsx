import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import HeroCarousel from '../components/HeroCarousel';
import QuadCard from '../components/QuadCard';
import ProductCarousel from '../components/ProductCarousel';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

function HomePage() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hero banner images - Amazon-style promotional banners
    const heroBanners = [
        {
            image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&h=600&fit=crop",
            alt: "Shop the latest electronics"
        },
        {
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=600&fit=crop",
            alt: "Fashion sale - Up to 70% off"
        },
        {
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=600&fit=crop",
            alt: "Home & Living deals"
        },
        {
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=600&fit=crop",
            alt: "New arrivals in fashion"
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsData, categoriesData] = await Promise.all([
                    api.getProducts(30, 0),
                    api.getCategories()
                ]);
                setFeaturedProducts(productsData.products);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Generate quad card data from categories
    const generateQuadCards = () => {
        const quadCards = [
            {
                title: "Up to 60% off | Styles for men",
                items: [
                    { label: "Clothing", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=300&h=300&fit=crop", link: "/products?category=mens-shirts" },
                    { label: "Footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop", link: "/products?category=mens-shoes" },
                    { label: "Watches", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop", link: "/products?category=mens-watches" },
                    { label: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop", link: "/products?category=sunglasses" }
                ],
                seeMoreLink: "/products?category=mens-shirts",
                seeMoreText: "See all offers"
            },
            {
                title: "Revamp your home in style",
                items: [
                    { label: "Cushion covers, bedsheets & more", image: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=300&h=300&fit=crop", link: "/products?category=furniture" },
                    { label: "Figurines, vases & more", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&h=300&fit=crop", link: "/products?category=home-decoration" },
                    { label: "Home storage", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop", link: "/products?category=furniture" },
                    { label: "Lighting solutions", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop", link: "/products?category=home-decoration" }
                ],
                seeMoreLink: "/products?category=home-decoration",
                seeMoreText: "Explore all"
            },
            {
                title: "Starting ₹149 | Headphones",
                items: [
                    { label: "Starting ₹249 | boAt", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", link: "/products?category=smartphones" },
                    { label: "Starting ₹349 | Noise", image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop", link: "/products?category=smartphones" },
                    { label: "Starting ₹649 | JBL", image: "https://images.unsplash.com/photo-1578319439584-104c94d37305?w=300&h=300&fit=crop", link: "/products?category=smartphones" },
                    { label: "Starting ₹149 | Zebronics", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop", link: "/products?category=smartphones" }
                ],
                seeMoreLink: "/products?category=smartphones",
                seeMoreText: "See all offers"
            },
            {
                title: "Up to 55% off | Appliances for your home",
                items: [
                    { label: "Air conditioners", image: "https://images.unsplash.com/photo-1631545806609-a22ff7f4ea42?w=300&h=300&fit=crop", link: "/products?category=laptops" },
                    { label: "Refrigerators", image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=300&h=300&fit=crop", link: "/products?category=laptops" },
                    { label: "Microwaves", image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=300&h=300&fit=crop", link: "/products?category=laptops" },
                    { label: "Washing machines", image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=300&h=300&fit=crop", link: "/products?category=laptops" }
                ],
                seeMoreLink: "/products?category=laptops",
                seeMoreText: "See more"
            },
            {
                title: "Minimum 40% off | Top women's styles",
                items: [
                    { label: "Women's Clothing", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop", link: "/products?category=womens-dresses" },
                    { label: "Footwear", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=300&fit=crop", link: "/products?category=womens-shoes" },
                    { label: "Handbags", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop", link: "/products?category=womens-bags" },
                    { label: "Watches & more", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop", link: "/products?category=womens-watches" }
                ],
                seeMoreLink: "/products?category=womens-dresses",
                seeMoreText: "See all offers"
            },
            {
                title: "Starting ₹99 | Beauty & grooming",
                items: [
                    { label: "Makeup", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop", link: "/products?category=beauty" },
                    { label: "Skincare", image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?w=300&h=300&fit=crop", link: "/products?category=skin-care" },
                    { label: "Haircare", image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=300&h=300&fit=crop", link: "/products?category=beauty" },
                    { label: "Fragrances", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop", link: "/products?category=fragrances" }
                ],
                seeMoreLink: "/products?category=beauty",
                seeMoreText: "See more"
            },
            {
                title: "Up to 60% off | Automotive essentials",
                items: [
                    { label: "Cleaning accessories", image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=300&h=300&fit=crop", link: "/products?category=vehicle" },
                    { label: "Tyre & rim care", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop", link: "/products?category=vehicle" },
                    { label: "Helmets", image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=300&h=300&fit=crop", link: "/products?category=motorcycle" },
                    { label: "Vacuum cleaner", image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=300&h=300&fit=crop", link: "/products?category=vehicle" }
                ],
                seeMoreLink: "/products?category=vehicle",
                seeMoreText: "See more"
            },
            {
                title: "Up to 70% off | Electronics",
                items: [
                    { label: "Smartphones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop", link: "/products?category=smartphones" },
                    { label: "Laptops", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop", link: "/products?category=laptops" },
                    { label: "Tablets", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop", link: "/products?category=tablets" },
                    { label: "Accessories", image: "https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=300&h=300&fit=crop", link: "/products?category=mobile-accessories" }
                ],
                seeMoreLink: "/products?category=smartphones",
                seeMoreText: "See all offers"
            }
        ];
        return quadCards;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#eaeded]">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    const quadCards = generateQuadCards();

    return (
        <main className="bg-[#eaeded] min-h-screen">
            {/* Hero Carousel */}
            <HeroCarousel banners={heroBanners} autoPlayInterval={5000} />

            {/* First Row - Quad Cards (overlapping hero) */}
            <div className="max-w-[1500px] mx-auto px-3 -mt-[150px] sm:-mt-[200px] md:-mt-[250px] relative z-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {quadCards.slice(0, 4).map((card, index) => (
                        <QuadCard
                            key={index}
                            title={card.title}
                            items={card.items}
                            seeMoreLink={card.seeMoreLink}
                            seeMoreText={card.seeMoreText}
                        />
                    ))}
                </div>
            </div>

            {/* Today's Deals Carousel */}
            <div className="max-w-[1500px] mx-auto px-3 mt-4">
                <ProductCarousel
                    title="Today's Deals"
                    products={featuredProducts.slice(0, 12)}
                    seeAllLink="/products"
                    seeAllText="See all deals"
                />
            </div>

            {/* Second Row - More Quad Cards */}
            <div className="max-w-[1500px] mx-auto px-3 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {quadCards.slice(4, 8).map((card, index) => (
                        <QuadCard
                            key={index + 4}
                            title={card.title}
                            items={card.items}
                            seeMoreLink={card.seeMoreLink}
                            seeMoreText={card.seeMoreText}
                        />
                    ))}
                </div>
            </div>

            {/* Full Width Promotional Banner */}
            <div className="max-w-[1500px] mx-auto px-3 mt-4">
                <Link to="/products" className="block">
                    <img
                        src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1500&h=200&fit=crop"
                        alt="Shop now and save big"
                        className="w-full h-[100px] sm:h-[150px] md:h-[200px] object-cover rounded"
                    />
                </Link>
            </div>

            {/* Best Sellers Carousel */}
            <div className="max-w-[1500px] mx-auto px-3 mt-4">
                <ProductCarousel
                    title="Best Sellers"
                    products={featuredProducts.slice(8, 20)}
                    seeAllLink="/products"
                    seeAllText="See more"
                />
            </div>

            {/* Single Category Cards Row */}
            <div className="max-w-[1500px] mx-auto px-3 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {categories.slice(0, 4).map((category) => (
                        <Link
                            key={category.slug}
                            to={`/products?category=${category.slug}`}
                            className="bg-white p-5 hover:shadow-md transition-shadow"
                        >
                            <h2 className="text-xl font-bold mb-3 text-gray-900">{category.name}</h2>
                            <div className="w-full h-[200px] bg-gray-50 rounded overflow-hidden">
                                <img
                                    src={`https://picsum.photos/seed/${category.slug}/400/300`}
                                    alt={category.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <p className="mt-3">
                                <span className="text-[#007185] text-sm hover:text-[#c45500] hover:underline">
                                    Shop now
                                </span>
                            </p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* New Arrivals Carousel */}
            <div className="max-w-[1500px] mx-auto px-3 mt-4">
                <ProductCarousel
                    title="Customers' Most-Loved"
                    products={featuredProducts.slice(15, 27)}
                    seeAllLink="/products"
                    seeAllText="See more"
                />
            </div>

            {/* Products Grid Section */}
            <div className="max-w-[1500px] mx-auto px-3 mt-4 pb-8">
                <div className="bg-white p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">More items to explore</h2>
                        <Link to="/products" className="text-[#007185] text-sm hover:text-[#c45500] hover:underline">
                            See all
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                        {featuredProducts.slice(0, 12).map((product) => (
                            <ProductCard key={product.id} product={product} compact />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default HomePage;
