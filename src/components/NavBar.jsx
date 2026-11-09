import { Link, NavLink } from "react-router-dom";

function Navbar({ isLoggedIn, onLogout}) {
    return (
        <nav className="sticky top-0 z-50 border-b border-[#E5E0D8] bg-[#FAF8F4]/95 px-6 py-5 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 sm:flex-row sm:justify-between">

                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-wide text-[#242424]">
                    PROD<span className="text-[#A99A84]">EXA</span>
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-5 text-xs font-medium sm:gap-8 sm:text-sm">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `transition-colors duration-300 ${
                                isActive
                                    ? "text-[#242424]"
                                    : "text-[#77736C] hover:text-[#242424]"
                            }`
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/catalog"
                        className={({ isActive }) =>
                            `transition-colors duration-300 ${
                                isActive
                                    ? "text-[#242424]"
                                    : "text-[#77736C] hover:text-[#242424]"
                            }`
                        }
                    >
                        Catalog
                    </NavLink>

                    <NavLink
                        to="/wishlist"
                        className={({ isActive }) =>
                            `transition-colors duration-300 ${
                                isActive
                                    ? "text-[#242424]"
                                    : "text-[#77736C] hover:text-[#242424]"
                            }`
                        }
                    >
                        Wishlist
                    </NavLink>

                    {isLoggedIn ? (
                        <button
                            onClick={onLogout}
                            className="text-[#77736C] transition-colors duration-300 hover:text-[#242424]"
                        >
                            Logout
                        </button>
                    ) : (
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                `transition-colors duration-300 ${
                                    isActive
                                        ? "text-[#242424]"
                                        : "text-[#77736C] hover:text-[#242424]"
                                }`
                            }
                        >
                            Login
                        </NavLink>
                    )}
                </div>

            </div>
        </nav>
    );
}

export default Navbar;