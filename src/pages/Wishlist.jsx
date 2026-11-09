import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";

function Wishlist({ wishlistService }) {
    const { wishlist, toggleWishlist } = wishlistService;
    const navigate = useNavigate();

    return (
        <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-[#242424]">
                    My Wishlist
                </h1>

                <span className="rounded-full bg-[#E9E2D7] px-3 py-1 text-xs font-semibold text-[#77736C]">
                    {wishlist.length}
                </span>
            </div>

            <p className="mt-2 text-sm text-[#77736C]">
                Your favorite products, all in one place.
            </p>

            {/* Empty State */}
            {wishlist.length === 0 && (
                <div className="mt-10 rounded-2xl border border-dashed border-[#E5E0D8] bg-white px-6 py-16 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E9E2D7]">
                        <Heart size={28} className="text-[#77736C]" />
                    </div>

                    <h2 className="text-lg font-semibold text-[#242424]">
                        Your Wishlist is Empty
                    </h2>

                    <p className="mt-2 text-sm text-[#77736C]">
                        You haven't saved any products yet.
                    </p>

                    <p className="mt-3 text-sm font-medium text-[#77736C]">
                        {wishlist.length} {wishlist.length === 1 ? "Product" : "Products"} Saved
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/catalog")}
                        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#242424] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#3A3A3A]"
                    >
                        Continue Shopping
                        <ArrowRight size={16} />
                    </button>
                </div>
            )}

             {wishlist.length > 0 && (
                        <button
                            type="button"
                            onClick={() => navigate("/catalog")}
                            className="mt-3 inline-flex items-center text-sm font-semibold text-[#77736C] transition hover:text-[#242424]"
                        >
                            <ArrowLeft size={16} /> Continue Exploring
                        </button>
                    )}

            {/* Product List */}
            {wishlist.length > 0 && (
                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {wishlist.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onDetailClick={() => navigate(`/products/${product.id}`)}
                            isWishlisted={true}
                            onWishlistClick={toggleWishlist}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}

export default Wishlist;