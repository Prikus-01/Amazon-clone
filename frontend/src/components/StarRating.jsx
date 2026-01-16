function StarRating({ rating, reviewCount, size = 'sm' }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const starSize = size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg';

    return (
        <div className="flex items-center gap-1">
            <div className={`flex ${starSize} text-[#ff9900]`}>
                {[...Array(fullStars)].map((_, i) => (
                    <i key={`full-${i}`} className="fa-solid fa-star"></i>
                ))}
                {hasHalfStar && <i className="fa-solid fa-star-half-stroke"></i>}
                {[...Array(emptyStars)].map((_, i) => (
                    <i key={`empty-${i}`} className="fa-regular fa-star"></i>
                ))}
            </div>
            {reviewCount !== undefined && (
                <span className="text-[#007185] text-sm hover:text-[#c7511f] hover:underline cursor-pointer">
                    {reviewCount.toLocaleString()}
                </span>
            )}
        </div>
    );
}

export default StarRating;
