import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-[#242424] px-6 py-12 text-white">
            <div className="mx-auto max-w-7xl">

                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">

                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold tracking-wide">
                            PROD<span className="text-[#C9BBA7]">EXA</span>
                        </h2>

                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#C9C2B8]">
                            Discover thoughtfully selected products
                            that inspire your everyday living.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-[#C9BBA7]">
                            Explore
                        </h3>

                       <ul className="mt-5 space-y-3 text-sm text-[#C9C2B8]">
                            <li>
                                <Link to="/" className="transition-colors duration-300 hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/catalog" className="transition-colors duration-300 hover:text-white">
                                    Catalog
                                </Link>
                            </li>
                            <li>
                                <Link to="/wishlist" className="transition-colors duration-300 hover:text-white">
                                    Wishlist
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* About */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-[#C9BBA7]">
                            About Prodexa
                        </h3>

                        <p className="mt-5 text-sm leading-relaxed text-[#C9C2B8]">
                            A simple and elegant platform to explore
                            a curated collection of products.
                        </p>
                    </div>

                </div>

                <div className="mt-12 border-t border-white/10 pt-6 text-center">
                    <p className="text-xs text-[#A69B8B]">
                        © {new Date().getFullYear()} Prodexa. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;