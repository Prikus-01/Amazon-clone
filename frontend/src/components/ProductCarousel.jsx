import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

/**
 * ProductCarousel - Horizontal scrollable product list with navigation buttons
 * Similar to Amazon's "Today's Deals" and "Best Sellers" carousels
 */
function ProductCarousel({ title, products, seeAllLink, seeAllText = "See all deals" }) {
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollButtons = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
            container.scrollLeft < container.scrollWidth - container.clientWidth - 10
        );
    };

    useEffect(() => {
        checkScrollButtons();
        window.addEventListener('resize', checkScrollButtons);
        return () => window.removeEventListener('resize', checkScrollButtons);
    }, [products]);

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const scrollAmount = container.clientWidth * 0.8;
        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });

        // Check buttons after scroll animation
        setTimeout(checkScrollButtons, 350);
    };

    if (!products || products.length === 0) return null;

    return (
        <div className="bg-white">
            <div className="px-4 sm:px-5 py-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                    {seeAllLink && (
                        <Link
                            to={seeAllLink}
                            className="text-[#007185] text-sm hover:text-[#c45500] hover:underline"
                        >
                            {seeAllText}
                        </Link>
                    )}
                </div>

                {/* Carousel Container */}
                <div className="relative group">
                    {/* Left Arrow */}
                    {canScrollLeft && (
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-24 bg-white shadow-lg rounded-r flex items-center justify-center hover:bg-gray-50 transition-colors"
                            aria-label="Scroll left"
                        >
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Products Container */}
                    <div
                        ref={scrollContainerRef}
                        onScroll={checkScrollButtons}
                        className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
                    >
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="flex-none w-[180px] sm:w-[200px] md:w-[220px]"
                            >
                                <ProductCard product={product} compact />
                            </div>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    {canScrollRight && (
                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-24 bg-white shadow-lg rounded-l flex items-center justify-center hover:bg-gray-50 transition-colors"
                            aria-label="Scroll right"
                        >
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductCarousel;
