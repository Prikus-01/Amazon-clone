import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { getCartCount } = useCart();
    const cartCount = getCartCount();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <>
            <header className="bg-[#131921] text-white sticky top-0 z-50">
                {/* Main Navigation */}
                <nav className="flex items-center justify-between px-2 sm:px-4 py-2 gap-2">
                    {/* Logo & Location */}
                    <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
                        <Link to="/" className="flex-shrink-0 border border-transparent hover:border-white p-1 rounded">
                            <img
                                src="https://media.geeksforgeeks.org/wp-content/uploads/20240326183545/amazon.png"
                                alt="Amazon"
                                className="w-16 sm:w-20 md:w-24"
                            />
                        </Link>
                        <div className="hidden md:flex flex-col text-xs border border-transparent hover:border-white p-1 rounded cursor-pointer">
                            <p className="text-gray-300 text-[10px]">Deliver to</p>
                            <div className="flex items-center gap-1 font-bold text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>India</span>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="flex flex-1 max-w-3xl mx-1 sm:mx-4">
                        <select className="hidden sm:block bg-[#e6e6e6] text-gray-700 px-2 py-2 rounded-l-md border-none outline-none text-xs font-medium cursor-pointer hover:bg-[#d4d4d4]">
                            <option>All</option>
                            <option>Electronics</option>
                            <option>Fashion</option>
                            <option>Home & Kitchen</option>
                            <option>Books</option>
                            <option>Beauty</option>
                            <option>Grocery</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Search Amazon.in"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 px-3 py-2 outline-none text-black text-sm bg-white sm:rounded-none rounded-l-md focus:ring-2 focus:ring-[#febd69] focus:ring-inset"
                        />
                        <button
                            type="submit"
                            className="bg-[#febd69] hover:bg-[#f3a847] px-3 sm:px-4 rounded-r-md flex items-center justify-center cursor-pointer transition-colors"
                            aria-label="Search"
                        >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#131921]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </form>

                    {/* Right Section - Account & Cart */}
                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        {/* Language */}
                        <div className="hidden lg:flex items-center gap-1 border border-transparent hover:border-white p-1 rounded cursor-pointer">
                            <img src="https://flagcdn.com/20x15/in.png" alt="India" className="w-5" />
                            <select className="bg-transparent border-none outline-none text-white text-sm font-bold cursor-pointer appearance-none pr-4">
                                <option className="bg-[#131921]">EN</option>
                                <option className="bg-[#131921]">HI</option>
                            </select>
                            <svg className="w-3 h-3 -ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {/* Account */}
                        <div className="hidden sm:flex flex-col text-xs border border-transparent hover:border-white p-1 rounded cursor-pointer">
                            <p className="text-gray-300 text-[10px]">Hello, Default User</p>
                            <div className="flex items-center">
                                <p className="font-bold text-sm">Account & Lists</p>
                                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Orders */}
                        <Link
                            to="/orders"
                            className="hidden md:flex flex-col text-xs border border-transparent hover:border-white p-1 rounded"
                        >
                            <p className="text-gray-300 text-[10px]">Returns</p>
                            <p className="font-bold text-sm">& Orders</p>
                        </Link>

                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="flex items-center gap-1 border border-transparent hover:border-white p-1 rounded"
                        >
                            <div className="relative">
                                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="absolute -top-1 left-4 sm:left-5 bg-[#f08804] text-[#131921] text-xs sm:text-sm font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            </div>
                            <span className="hidden sm:inline font-bold text-sm">Cart</span>
                        </Link>
                    </div>
                </nav>

                {/* Sub Navigation - Categories */}
                <div className="bg-[#232f3e] flex items-center px-2 sm:px-4 py-1.5 text-sm overflow-x-auto scrollbar-hide">
                    <Link to="/products" className="flex items-center gap-1 mr-4 cursor-pointer hover:border hover:border-white border border-transparent p-1 rounded flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <span className="font-bold">All</span>
                    </Link>

                    <div className="flex items-center gap-0.5 sm:gap-1">
                        <Link to="/products?category=smartphones" className="cursor-pointer hover:border hover:border-white border border-transparent px-2 py-1 rounded whitespace-nowrap text-xs sm:text-sm">Fresh</Link>
                        <Link to="/products" className="cursor-pointer hover:border hover:border-white border border-transparent px-2 py-1 rounded whitespace-nowrap text-xs sm:text-sm">Amazon miniTV</Link>
                        <Link to="/products" className="cursor-pointer hover:border hover:border-white border border-transparent px-2 py-1 rounded whitespace-nowrap text-xs sm:text-sm">Sell</Link>
                        <Link to="/products" className="cursor-pointer hover:border hover:border-white border border-transparent px-2 py-1 rounded whitespace-nowrap text-xs sm:text-sm">Best Sellers</Link>
                        <Link to="/products?category=smartphones" className="hidden sm:block cursor-pointer hover:border hover:border-white border border-transparent px-2 py-1 rounded whitespace-nowrap text-xs sm:text-sm">Mobiles</Link>
                        <Link to="/products" className="hidden sm:block cursor-pointer hover:border hover:border-white border border-transparent px-2 py-1 rounded whitespace-nowrap text-xs sm:text-sm">Today's Deals</Link>
                        <Link to="/products" className="hidden md:block cursor-pointer hover:border hover:border-white border border-transparent px-2 py-1 rounded whitespace-nowrap text-xs sm:text-sm">Prime</Link>
                        <Link to="/products?category=groceries" className="hidden md:block cursor-pointer hover:border hover:border-white border border-transparent px-2 py-1 rounded whitespace-nowrap text-xs sm:text-sm">Customer Service</Link>
                        <Link to="/products?category=laptops" className="hidden lg:block cursor-pointer hover:border hover:border-white border border-transparent px-2 py-1 rounded whitespace-nowrap text-xs sm:text-sm">Electronics</Link>
                        <Link to="/products?category=womens-dresses" className="hidden lg:block cursor-pointer hover:border hover:border-white border border-transparent px-2 py-1 rounded whitespace-nowrap text-xs sm:text-sm">Fashion</Link>
                        <Link to="/wishlist" className="hidden xl:block cursor-pointer hover:border hover:border-white border border-transparent px-2 py-1 rounded whitespace-nowrap text-xs sm:text-sm">
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                Wishlist
                            </span>
                        </Link>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header