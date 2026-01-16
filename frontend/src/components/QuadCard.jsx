import { Link } from 'react-router-dom';

/**
 * QuadCard - Amazon's signature 2x2 grid card component
 * Shows 4 sub-categories in a single card with images and labels
 */
function QuadCard({ title, items, seeMoreLink, seeMoreText = "See more" }) {
    return (
        <div className="bg-white p-5 h-full flex flex-col">
            <h2 className="text-xl font-bold mb-3 text-gray-900 leading-tight">{title}</h2>

            <div className="grid grid-cols-2 gap-3 flex-1">
                {items.slice(0, 4).map((item, index) => (
                    <Link
                        key={index}
                        to={item.link}
                        className="group"
                    >
                        <div className="aspect-square bg-gray-50 rounded overflow-hidden mb-1">
                            <img
                                src={item.image}
                                alt={item.label}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <p className="text-xs text-gray-700 leading-tight line-clamp-2 group-hover:text-[#c45500]">
                            {item.label}
                        </p>
                    </Link>
                ))}
            </div>

            <Link
                to={seeMoreLink}
                className="text-[#007185] text-sm hover:text-[#c45500] hover:underline mt-3 inline-block"
            >
                {seeMoreText}
            </Link>
        </div>
    );
}

export default QuadCard;
