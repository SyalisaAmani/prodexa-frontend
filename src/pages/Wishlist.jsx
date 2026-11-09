import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

function Wishlist({ wishlistService }) {
    const { wishlist, toggleWishlist } = wishlistService;
    const navigate = useNavigate();

    return (
        <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-[#242424]">
                My Wishlist
            </h1>

            <p className="mt-2 text-sm text-[#77736C]">
                Your favorite products, all in one place.
            </p>

            {/* Empty State */}
            {wishlist.length === 0 && (
                <div className="mt-10 rounded-2xl border border-dashed border-[#E5E0D8] bg-white px-6 py-16 text-center">
                    <div className="mb-4 text-4xl">♡</div>

                    <h2 className="text-lg font-semibold text-[#242424]">
                        Your Wishlist is Empty
                    </h2>

                    <p className="mt-2 text-sm text-[#77736C]">
                        You haven't saved any products yet.
                    </p>
                </div>
            )}

            {/* Product List */}
            {wishlist.length > 0 && (
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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