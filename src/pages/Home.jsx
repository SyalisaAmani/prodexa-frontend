
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../services/ProductService";
import { ArrowRight } from "lucide-react";
import ProductCard from "../components/ProductCard";

function Home({ wishlistService, isLoggedIn }) {
    const navigate = useNavigate();

    // Hero Products State
    const [heroProducts, setHeroProducts] = useState([]);
    const [activeHeroIndex, setActiveHeroIndex] = useState(0);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    const heroProduct = heroProducts[activeHeroIndex];
    const [isFading, setIsFading] = useState(false);

    // Fetch Hero Products
    useEffect(() => {
        const fetchHeroProducts = async () => {
            try {
                const products = await getAllProducts();

                setHeroProducts(products.slice(0, 4));
            } catch (error) {
                console.error("Failed to fetch hero products:", error);
            }
        };

        fetchHeroProducts();
    }, []);

    // Automatic Hero Slider 
    useEffect(() => {
        if (heroProducts.length <= 1) return;

        const interval = setInterval(() => {
            setIsFading(true);

            setTimeout(() => {
                setActiveHeroIndex((currentIndex) =>
                    (currentIndex + 1) % heroProducts.length
                );

                setIsFading(false);
            }, 300);
        }, 3500);

        return () => clearInterval(interval);
    }, [heroProducts.length]);

    // Featured products image
    useEffect(() => {
    const fetchFeaturedProducts = async () => {
        try {
            const products = await getAllProducts();
            setFeaturedProducts(products.slice(4, 8));
        } catch (error) {
            console.error("Failed to fetch featured products:", error);
        }
    };

    fetchFeaturedProducts();
}, []);

    return (
        <main className="bg-[#FAF8F4]">

            {/* Hero Section */}
            <section className="mx-auto grid min-h-[80vh] max-w-350 grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-12">

                {/* Left Column */}
                <div className="relative z-10">
                    <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#77736C]">
                        <span className="h-px w-10 bg-[#77736C]"></span>
                        Discover Your Style
                    </p>

                    <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.05] tracking-tight text-[#242424] sm:text-6xl lg:text-7xl">
                        Find Your
                        <span className="block font-medium italic text-[#A69B8B]">
                            Everyday
                        </span>
                        Inspiration.
                    </h1>

                    <p className="mt-7 max-w-md text-base leading-relaxed text-[#77736C]">
                        Explore a curated collection of thoughtfully selected
                        products that bring quality, style, and inspiration
                        into your everyday life.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-6">
                        <button
                            type="button"
                            onClick={() => navigate("/catalog")}
                            className="group inline-flex items-center gap-4 bg-[#242424] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#45413C]"
                        >
                            Explore Collection

                            <ArrowRight
                                size={17}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </button>

                        <span className="text-xs font-medium tracking-wide text-[#77736C]">
                            Curated for everyday living
                        </span>
                    </div>
                </div>

                {/* Right Column - Hero Slider */}
                <div className="relative">

                    <div className="relative min-h-85 overflow-hidden bg-[#E9E2D7] sm:min-h-130">

                        {/* Decorative Circle */}
                        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/40"></div>

                        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border border-white/40"></div>

                        {/* Product Image */}
                        {heroProduct && (
                            <div className="relative flex min-h-85 items-center justify-center p-8 sm:min-h-130 sm:p-16">

                                <img
                                    key={heroProduct.id}
                                    src={heroProduct.thumbnail}
                                    alt={heroProduct.title}
                                    className={`relative z-10 h-65 w-full object-contain transition-all duration-105 sm:h-105 ${
                                        isFading
                                            ? "scale-95 opacity-0"
                                            : "scale-100 opacity-100"
                                    }`}
                                />

                            </div>
                        )}

                        {/* Product Number */}
                        <div className="absolute bottom-6 left-7 z-20 text-sm font-semibold tracking-widest text-[#77736C]">
                            0{activeHeroIndex + 1}
                            <span className="mx-2 text-[#B7AEA1]">/</span>
                            0{heroProducts.length}
                        </div>

                    </div>

                    {/* Product Info and Slider Indicators */}
                    <div className="mt-5 flex items-center justify-between gap-4">

                        <div className="min-w-0">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A69B8B]">
                                Featured Item
                            </p>

                            <p className="mt-1 truncate text-sm font-semibold text-[#242424]">
                                {heroProduct?.title || "Discover our collection"}
                            </p>
                        </div>

                        {heroProducts.length > 1 && (
                            <div className="flex shrink-0 items-center gap-2">
                                {heroProducts.map((product, index) => (
                                    <button
                                        key={product.id}
                                        type="button"
                                        onClick={() => {
                                            if (activeHeroIndex === index) return;

                                            setIsFading(true);

                                            setTimeout(() => {
                                                setActiveHeroIndex(index);

                                                setTimeout(() => {
                                                    setIsFading(false);
                                                }, 50);
                                            }, 300);
                                        }}
                                        aria-label={`Show product ${index + 1}`}
                                        aria-pressed={activeHeroIndex === index}
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            activeHeroIndex === index
                                                ? "w-8 bg-[#242424]"
                                                : "w-2 bg-[#C9C2B8] hover:bg-[#77736C]"
                                        }`}
                                    />
                                ))}
                            </div>
                        )}

                    </div>
                </div>

            </section>

            {/* Featured Products Section */}
            <section className="mx-auto max-w-7xl px-6 py-20">
                <div className="mb-12 flex flex-col items-center text-center">
                    <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#A69B8B]">
                        <span className="h-px w-8 bg-[#A69B8B]"></span>
                        Our Collection
                        <span className="h-px w-8 bg-[#A69B8B]"></span>
                    </p>

                    <h2 className="text-3xl font-extrabold tracking-tight text-[#242424] sm:text-4xl lg:text-5xl">
                        Featured
                        <span className="ml-2 font-medium italic text-[#A69B8B]">
                            Products.
                        </span>
                    </h2>

                    <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#77736C] sm:text-base">
                        Discover our handpicked selection of products,
                        thoughtfully chosen to inspire your everyday living.
                    </p>
                </div>

                <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
                    {featuredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onDetailClick={() => navigate(`/products/${product.id}`)}
                            isWishlisted={wishlistService.isInWishlist(product.id)}
                            onWishlistClick={(selectedProduct) => {
                                if (!isLoggedIn) {
                                    navigate("/login");
                                    return;
                                }

                                wishlistService.toggleWishlist(selectedProduct);
                            }}
                        />
                        ))}
                </div>

                <div className="mt-12 flex justify-center">
                    <button
                        type="button"
                        onClick={() => navigate("/catalog")}
                        className="group inline-flex items-center gap-3 border border-[#242424] px-8 py-4 text-sm font-semibold text-[#242424] transition-all duration-300 hover:bg-[#242424] hover:text-white"
                    >
                        View All Products

                        <ArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </button>
                </div>
            </section>

            {/* Closing Section */}
            <section className="mx-6 mb-20 bg-[#242424] px-6 py-16 text-center sm:px-12 sm:py-20">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9C2B8]">
                    Explore More
                </p>

                <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                    Find Something
                    <span className="block font-medium italic text-[#C9BBA7]">
                        Worth Discovering.
                    </span>
                </h2>

                <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-[#D0CBC3]">
                    Your next favorite product might be just one click away.
                    Explore our collection and discover something inspiring.
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/catalog")}
                    className="group mt-8 inline-flex items-center gap-3 bg-[#E9E2D7] px-8 py-4 text-sm font-semibold text-[#242424] transition-all duration-300 hover:bg-white"
                >
                    Explore Catalog

                    <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                </button>
            </section>
        </main>
    );
}

export default Home;
