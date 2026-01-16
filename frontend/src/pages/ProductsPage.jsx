import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import CategoryFilter from '../components/CategoryFilter';

function ProductsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalProducts, setTotalProducts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const searchQuery = searchParams.get('search') || '';
    const selectedCategory = searchParams.get('category') || '';
    const productsPerPage = 20;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await api.getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let data;
                const skip = (currentPage - 1) * productsPerPage;

                if (searchQuery) {
                    data = await api.searchProducts(searchQuery, 100);
                } else if (selectedCategory) {
                    data = await api.getProductsByCategory(selectedCategory, productsPerPage, skip);
                } else {
                    data = await api.getProducts(productsPerPage, skip);
                }

                setProducts(data.products);
                setTotalProducts(data.total);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [searchQuery, selectedCategory, currentPage]);

    const handleCategoryChange = (category) => {
        setCurrentPage(1);
        if (category) {
            setSearchParams({ category });
        } else {
            setSearchParams({});
        }
    };

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <main className="bg-gray-100 min-h-screen">
            <div className="max-w-[1500px] mx-auto px-4 py-6">
                {/* Results Header */}
                <div className="mb-4">
                    {searchQuery ? (
                        <h1 className="text-xl">
                            <span className="text-gray-600">Results for </span>
                            <span className="text-[#c45500] font-medium">"{searchQuery}"</span>
                        </h1>
                    ) : selectedCategory ? (
                        <h1 className="text-xl font-medium text-gray-900">
                            {selectedCategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </h1>
                    ) : (
                        <h1 className="text-xl font-medium text-gray-900">All Products</h1>
                    )}
                    <p className="text-sm text-gray-600 mt-1">
                        {loading ? 'Loading...' : `${totalProducts} results`}
                    </p>
                </div>

                <div className="flex gap-6">
                    {/* Sidebar Filters */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <CategoryFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategoryChange={handleCategoryChange}
                        />
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {/* Mobile Category Filter */}
                        <div className="lg:hidden mb-4">
                            <select
                                value={selectedCategory}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                            >
                                <option value="">All Departments</option>
                                {categories.map((cat) => (
                                    <option key={cat.slug} value={cat.slug}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {[...Array(8)].map((_, i) => (
                                    <ProductSkeleton key={i} />
                                ))}
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-12">
                                <i className="fa-solid fa-box-open text-6xl text-gray-300 mb-4"></i>
                                <h2 className="text-xl font-medium text-gray-900 mb-2">No products found</h2>
                                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {products.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-2 mt-8">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <i className="fa-solid fa-chevron-left mr-1"></i>
                                            Previous
                                        </button>

                                        <div className="flex gap-1">
                                            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                                                let pageNum;
                                                if (totalPages <= 5) {
                                                    pageNum = i + 1;
                                                } else if (currentPage <= 3) {
                                                    pageNum = i + 1;
                                                } else if (currentPage >= totalPages - 2) {
                                                    pageNum = totalPages - 4 + i;
                                                } else {
                                                    pageNum = currentPage - 2 + i;
                                                }

                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => handlePageChange(pageNum)}
                                                        className={`w-10 h-10 rounded-lg ${currentPage === pageNum
                                                                ? 'bg-[#febd69] text-gray-900 font-bold'
                                                                : 'bg-white border border-gray-300 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next
                                            <i className="fa-solid fa-chevron-right ml-1"></i>
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProductsPage;
