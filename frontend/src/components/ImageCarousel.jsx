import { useState } from 'react';

function ImageCarousel({ images, title }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    if (!images || images.length === 0) {
        return (
            <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
            </div>
        );
    }

    return (
        <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedIndex(index)}
                        className={`w-16 h-16 border-2 rounded-lg overflow-hidden flex-shrink-0 ${index === selectedIndex ? 'border-[#e77600]' : 'border-gray-200 hover:border-[#e77600]'
                            }`}
                    >
                        <img
                            src={image}
                            alt={`${title} ${index + 1}`}
                            className="w-full h-full object-contain bg-white"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div
                className="flex-1 relative overflow-hidden bg-white rounded-lg border border-gray-200"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
            >
                <img
                    src={images[selectedIndex]}
                    alt={title}
                    className={`w-full h-96 object-contain transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'
                        }`}
                />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={() => setSelectedIndex((prev) => (prev - 1 + images.length) % images.length)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-md flex items-center justify-center hover:bg-white transition-colors"
                        >
                            <i className="fa-solid fa-chevron-left text-gray-600"></i>
                        </button>
                        <button
                            onClick={() => setSelectedIndex((prev) => (prev + 1) % images.length)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-md flex items-center justify-center hover:bg-white transition-colors"
                        >
                            <i className="fa-solid fa-chevron-right text-gray-600"></i>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default ImageCarousel;
