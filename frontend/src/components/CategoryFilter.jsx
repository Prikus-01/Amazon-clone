function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
    const formatCategoryName = (slug) => {
        return slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-bold text-gray-900 mb-3">Department</h3>
            <ul className="space-y-2">
                <li>
                    <button
                        onClick={() => onCategoryChange('')}
                        className={`w-full text-left text-sm py-1 px-2 rounded transition-colors ${!selectedCategory
                                ? 'bg-[#fef3cd] font-medium text-gray-900'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        All Departments
                    </button>
                </li>
                {categories.map((category) => (
                    <li key={category.slug || category}>
                        <button
                            onClick={() => onCategoryChange(category.slug || category)}
                            className={`w-full text-left text-sm py-1 px-2 rounded transition-colors ${selectedCategory === (category.slug || category)
                                    ? 'bg-[#fef3cd] font-medium text-gray-900'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {category.name || formatCategoryName(category)}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryFilter;
