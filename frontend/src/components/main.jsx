import { useEffect, useState } from "react";
function Main() {

    const [currentSlide, setCurrentSlide] = useState(0);

    const bannerImages = [
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=1500&h=400&fit=crop"
    ];


    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
    };

    const products = [
        { id: 1, name: "Wired Gaming Mouse", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop" },
        { id: 2, name: "Wireless Mouse Pro", image: "https://images.unsplash.com/photo-1586920740099-2a5f5f6f5e7a?w=300&h=300&fit=crop" },
        { id: 3, name: "Ergonomic Mouse", image: "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=300&h=300&fit=crop" },
        { id: 4, name: "RGB Gaming Mouse", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&h=300&fit=crop" },
        { id: 5, name: "Compact Mouse", image: "https://images.unsplash.com/photo-1613141411244-0e4ac6e87e01?w=300&h=300&fit=crop" },
        { id: 6, name: "Premium Wireless", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop" },
        { id: 7, name: "Office Mouse", image: "https://images.unsplash.com/photo-1586920740099-2a5f5f6f5e7a?w=300&h=300&fit=crop" }
    ];

    const categoryCards = [
        { id: 1, title: "Gaming accessories", image: "https://media.geeksforgeeks.org/wp-content/uploads/20240326122918/image14.jpg" },
        { id: 2, title: "Deal in PCs", image: "https://media.geeksforgeeks.org/wp-content/uploads/20240326122917/image12.jpg" },
        { id: 3, title: "Amazon Gadget Store", image: "https://media.geeksforgeeks.org/wp-content/uploads/20240326122918/image15.jpg" },
        { id: 4, title: "Handpicked music", image: "https://media.geeksforgeeks.org/wp-content/uploads/20240326122916/image11.jpg" },
        { id: 5, title: "Fill your Easter basket", image: "https://media.geeksforgeeks.org/wp-content/uploads/20240326121956/image3.jpg" },
        { id: 6, title: "Top Deal", image: "https://media.geeksforgeeks.org/wp-content/uploads/20240326122915/image8.jpg" },
        { id: 7, title: "Shop deals in Fashion", image: "https://media.geeksforgeeks.org/wp-content/uploads/20240326122915/image9.jpg" },
        { id: 8, title: "Gaming merchandise", image: "https://media.geeksforgeeks.org/wp-content/uploads/20240326122917/image13.jpg" }
    ];
    const categoryCard = [
        { id: 1, title: "Gaming accessories", image: "https://media.geeksforgeeks.org/wp-content/uploads/20240326122918/image14.jpg" },
        { id: 2, title: "Deal in PCs", image: "https://media.geeksforgeeks.org/wp-content/uploads/20240326122917/image12.jpg" },
        { id: 3, title: "Amazon Gadget Store", image: "https://media.geeksforgeeks.org/wp-content/uploads/20240326122918/image15.jpg" },
        { id: 4, title: "Handpicked music", image: "https://media.geeksforgeeks.org/wp-content/uploads/20240326122916/image11.jpg" }
    ];

    return (
        <main className="bg-gray-100">
            {/** image banner  */}
            {/* Banner Slider */}
            <div className="relative w-[1500px] mx-auto h-[400px] overflow-hidden bg-gray-900">
                {bannerImages.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <img
                            src={image}
                            alt={`Banner ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}

                {/* Previous Button */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Next Button */}
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {bannerImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${
                                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Items Grid Container */}
            <div className="max-w-[1500px] mx-auto px-4 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {categoryCards.map((card) => (
                        <div key={card.id} className="bg-white p-5 shadow-sm hover:shadow-lg transition-shadow">
                            <h2 className="text-xl font-bold mb-3 text-gray-900">{card.title}</h2>
                            <img 
                                src={card.image} 
                                alt={card.title}
                                className="w-full h-[280px] object-cover mb-3"
                            />
                            <p>
                                <a href="#" className="text-[#007185] text-sm hover:text-[#C7511F] hover:underline">
                                    See more
                                </a>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Horizontal Scroll Section 1 */}
            <div className="py-6 mb-2">
                <div className="bg-white max-w-[1500px] mx-auto px-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">More items to consider</h2>
                        <a href="#" className="text-[#007185] text-sm hover:text-[#C7511F] hover:underline">
                            See more
                        </a>
                    </div>
                    <div className="relative">
                        <div className="overflow-x-auto scrollbar-hide">
                            <div className="flex gap-4 pb-2">
                                {products.map((product) => (
                                    <div key={product.id} className="flex-none w-[200px]">
                                        <div className="bg-white border border-gray-200 rounded hover:shadow-lg transition-shadow cursor-pointer">
                                            <img 
                                                src={product.image} 
                                                alt={product.name}
                                                className="w-full h-[200px] object-cover rounded-t"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Items Grid Container */}
            <div className="max-w-[1500px] mx-auto px-4 py-6 ">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {categoryCard.map((card) => (
                        <div key={card.id} className="bg-white p-5 shadow-sm hover:shadow-lg transition-shadow">
                            <h2 className="text-xl font-bold mb-3 text-gray-900">{card.title}</h2>
                            <img 
                                src={card.image} 
                                alt={card.title}
                                className="w-full h-[280px] object-cover mb-3"
                            />
                            <p>
                                <a href="#" className="text-[#007185] text-sm hover:text-[#C7511F] hover:underline">
                                    See more
                                </a>
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Horizontal Scroll Section 2 */}
            <div className="py-6 mb-6">
                <div className="bg-white max-w-[1500px] mx-auto px-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Inspired by your browsing history</h2>
                        <a href="#" className="text-[#007185] text-sm hover:text-[#C7511F] hover:underline">
                            See more
                        </a>
                    </div>
                    <div className="relative">
                        <div className="overflow-x-auto scrollbar-hide">
                            <div className="flex gap-4 pb-2">
                                {products.map((product) => (
                                    <div key={`browsing-${product.id}`} className="flex-none w-[200px]">
                                        <div className="bg-white border border-gray-200 rounded hover:shadow-lg transition-shadow cursor-pointer">
                                            <img 
                                                src={product.image} 
                                                alt={product.name}
                                                className="w-full h-[200px] object-cover rounded-t"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </main>
    )
}

export default Main