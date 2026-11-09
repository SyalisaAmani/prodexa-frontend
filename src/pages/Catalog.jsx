
import { useEffect, useState } from "react";
import { getAllProducts } from "../services/ProductService";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

function Catalog({ wishlistService, isLoggedIn }) {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const productsPerPage = 12;

    const navigate = useNavigate();

    const handleDetailClick = (product) => {
        navigate(`/products/${product.id}`);
    };

    // Search and Category Filter
    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (product.brand || "").toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // Sorting
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === "price-low") {
            return a.price - b.price;
        }

        if (sortBy === "price-high") {
            return b.price - a.price;
        }

        if (sortBy === "rating") {
            return b.rating - a.rating;
        }

        return 0;
    });

    // Pagination
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

    const startIndex = (currentPage - 1) * productsPerPage;

    const currentProducts = sortedProducts.slice(
        startIndex,
        startIndex + productsPerPage
    );

    // Categories
    const categories = [
        ...new Set(products.map((product) => product.category))
    ];

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProducts();
    }, []);

    // Reset pagination when filters change
    

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Catalog Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-[#242424] sm:text-4xl">
                    Product Catalog
                </h1>

                <p className="mt-2 text-sm leading-relaxed text-[#77736C] sm:text-base">
                    Explore our collection of products.
                </p>
            </div>

            {/* Search Product and Category Filter */}
            <div className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-[#E5E0D8] bg-white p-4 shadow-sm md:grid-cols-[1.5fr_1fr_1fr]">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="h-12 w-full rounded-lg border border-[#E5E0D8] bg-[#FAF8F4] px-4 text-sm text-[#242424] outline-none transition focus:border-[#242424] focus:ring-1 focus:ring-[#242424]"
                />

                <select
                    value={selectedCategory}
                    onChange={(event) => { setSelectedCategory(event.target.value);
                        setCurrentPage(1);
                    }}
                    className="h-12 w-full rounded-lg border border-[#E5E0D8] bg-[#FAF8F4] px-4 text-sm text-[#242424] outline-none transition focus:border-[#242424] focus:ring-1 focus:ring-[#242424]"
                >
                    <option value="all">All Categories</option>

                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                {/* Sorting */}
                <select
                    value={sortBy}
                    onChange={(event) => {setSortBy(event.target.value);
                        setCurrentPage(1);
                    }}
                    className="h-12 w-full rounded-lg border border-[#E5E0D8] bg-[#FAF8F4] px-4 text-sm text-[#242424] outline-none transition focus:border-[#242424] focus:ring-1 focus:ring-[#242424]"
                >
                    <option value="default">Default Sorting</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating: Highest First</option>
                </select>
            </div>

            {/* Loading Products */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E9E2D7] border-t-[#242424]"></div>

                    <p className="mt-4 text-sm font-medium text-[#77736C]">
                        Loading products...
                    </p>
                </div>
            )}

            {/* Error page */}
            {error && (
                <div className="my-8 rounded-xl border border-[#B45345]/20 bg-[#B45345]/5 px-6 py-8 text-center">
                    <p className="text-base font-semibold text-[#B45345]">
                        Oops! Something went wrong.
                    </p>

                    <p className="mt-2 text-sm text-[#77736C]">
                        {error}
                    </p>
                </div>
            )}

            {!isLoading && !error && (
                <>
                    <p className="mt-6">
                        Total products: {filteredProducts.length}
                    </p>

                    {/* Product Grid */}
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {currentProducts.length > 0 ? (
                            currentProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onDetailClick={handleDetailClick}
                                    isWishlisted={wishlistService.isInWishlist(product.id)}
                                    onWishlistClick={(selectedProduct) => {
                                        if (!isLoggedIn) {
                                            navigate("/login");
                                            return;
                                        }

                                        wishlistService.toggleWishlist(selectedProduct);
                                    }}
                                />
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E5E0D8] bg-white px-6 py-16 text-center">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E9E2D7]">
                                    <span className="text-2xl">🔍</span>
                                </div>

                                <h3 className="text-lg font-semibold text-[#242424]">
                                    No Products Found
                                </h3>

                                <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#77736C]">
                                    We couldn't find any products matching your search.
                                    Try adjusting your keyword or category filter.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 0 && (
                        <div className="mt-12 flex items-center justify-center gap-5 border-t border-[#E5E0D8] pt-8">
                            <button
                                type="button"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="rounded-lg border border-[#E5E0D8] bg-white px-5 py-2.5 text-sm font-medium text-[#242424] transition duration-200 hover:border-[#242424] hover:bg-[#242424] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#E5E0D8] disabled:hover:bg-white disabled:hover:text-[#242424]"
                            >
                                Previous
                            </button>

                            <span className="text-sm font-medium tabular-nums text-[#77736C]">
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                type="button"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="rounded-lg border border-[#E5E0D8] bg-white px-5 py-2.5 text-sm font-medium text-[#242424] transition duration-200 hover:border-[#242424] hover:bg-[#242424] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#E5E0D8] disabled:hover:bg-white disabled:hover:text-[#242424]"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </main>
    );
}

export default Catalog;
