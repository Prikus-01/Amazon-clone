function Footer(){
    return(
        <>
            <footer className="bg-[#232f3e] text-white">
                <a 
                    href="#" 
                    className="block bg-[#37475a] text-center py-4 text-sm hover:bg-[#485769] transition-colors"
                >
                    Back to top
                </a>

                <div className="bg-[#232f3e] py-10 px-8">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <ul className="space-y-2">
                            <p className="font-bold text-base mb-3">Get to Know Us</p>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">Careers</a>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">Blog</a>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">About Amazon</a>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">Investor Relations</a>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">Amazon Devices</a>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">Amazon Science</a>
                        </ul>
                        <ul className="space-y-2">
                            <p className="font-bold text-base mb-3">Make Money with Us</p>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">Sell products on Amazon</a>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">Sell on Amazon Business</a>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">Sell apps on Amazon</a>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">Become an Affiliate</a>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">Self-Publish with Us</a>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">Host an Amazon Hub</a>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">›See More Make Money with Us</a>
                        </ul>
                        <ul className="space-y-2">
                            <p className="font-bold text-base mb-3">Amazon Payment Products</p>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">Amazon Business Card</a>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">Shop with Points</a>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">Reload Your Balance</a>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">Amazon Currency Converter</a>
                        </ul>
                        <ul className="space-y-2">
                            <p className="font-bold text-base mb-3">Let Us Help You</p>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">Amazon and COVID-19</a>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">Your Account</a>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">Your Orders</a>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">Shipping Rates & Policies</a>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">Returns & Replacements</a>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">Manage Your Content and Devices</a>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">Amazon Assistant</a>
                            <a className="block text-sm text-gray-300 hover:underline cursor-pointer">Help</a>
                        </ul>
                    </div>
                </div>

                <div className="bg-[#131921] border-t border-[#3a4553] py-6">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 px-8">
                        <div className="w-24">
                            <img 
                                src="https://media.geeksforgeeks.org/wp-content/uploads/20240326183545/amazon.png" 
                                alt="Amazon"
                                className="w-full"
                            />
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <select className="bg-[#37475a] text-white border border-[#555] rounded px-4 py-2 text-sm cursor-pointer hover:bg-[#485769] outline-none">
                                <option value="En">English</option>
                            </select>
                            <select className="bg-[#37475a] text-white border border-[#555] rounded px-4 py-2 text-sm cursor-pointer hover:bg-[#485769] outline-none">
                                <option value="1">$ USD - U.S. Dollar</option>
                            </select>
                            <select className="bg-[#37475a] text-white border border-[#555] rounded px-4 py-2 text-sm cursor-pointer hover:bg-[#485769] outline-none">
                                <option value="4">United States</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-[#131921] py-8 text-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-300">
                            <a href="#" className="hover:underline">Conditions of Use</a>
                            <a href="#" className="hover:underline">Privacy Notice</a>
                            <a href="#" className="hover:underline">Your Ads Privacy Choices</a>
                        </div>
                        <p className="text-xs text-gray-400">
                            © 1996-2023, Amazon.com, Inc. or its affiliates
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer