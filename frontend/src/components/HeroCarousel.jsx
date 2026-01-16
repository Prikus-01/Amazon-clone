import { useState, useEffect, useCallback } from 'react';

/**
 * HeroCarousel - Full-width hero banner carousel with Amazon styling
 * Features gradient fade to page background, navigation arrows, and auto-rotation
 */
function HeroCarousel({ banners, autoPlayInterval = 5000 }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, [banners.length]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    }, [banners.length]);

    // Auto-rotate slides
    useEffect(() => {
        if (isHovered || banners.length <= 1) return;

        const timer = setInterval(nextSlide, autoPlayInterval);
        return () => clearInterval(timer);
    }, [isHovered, banners.length, autoPlayInterval, nextSlide]);

    if (!banners || banners.length === 0) return null;

    return (
        <div
            className="relative w-[1500px] mx-auto h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Banner Images */}
            {banners.map((banner, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    <img
                        src={banner.image}
                        alt={banner.alt || `Banner ${index + 1}`}
                        className="w-full h-full object-cover object-top"
                    />
                </div>
            ))}

            {/* Gradient Fade to Page Background */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#eaeded] via-[#eaeded]/60 to-transparent z-20 pointer-events-none"></div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-0 top-0 bottom-[50%] w-16 sm:w-20 flex items-center justify-center bg-transparent hover:bg-black/5 transition-colors z-30 group"
                aria-label="Previous slide"
            >
                <svg
                    className="w-8 h-8 sm:w-12 sm:h-12 text-gray-700 group-hover:text-gray-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-0 top-0 bottom-[50%] w-16 sm:w-20 flex items-center justify-center bg-transparent hover:bg-black/5 transition-colors z-30 group"
                aria-label="Next slide"
            >
                <svg
                    className="w-8 h-8 sm:w-12 sm:h-12 text-gray-700 group-hover:text-gray-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}

export default HeroCarousel;
