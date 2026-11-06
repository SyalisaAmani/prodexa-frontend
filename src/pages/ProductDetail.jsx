
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/ProductService";

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
        async function fetchProduct() {
            try {
                setIsLoading(true);
                setError("");
                setProduct(null);
                setSelectedImage("");

                const data = await getProductById(id);

                setProduct(data);
                setSelectedImage(data.images?.[0] || data.thumbnail);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    return (
        <main className="mx-auto max-w-6xl px-6 py-10">

            {/* Loading State */}
            {isLoading && (
                <p className="py-20 text-center text-stone-500">
                    Loading product detail...
                </p>
            )}

            {/* Product Not Found */}
            {!isLoading && !error && !product && (
                <div className="py-20 text-center">
                    <h2 className="mb-3 text-2xl font-bold text-[#242424]">
                        Product Not Found
                    </h2>

                    <p className="mb-6 text-stone-500">
                        Sorry, the product you are looking for does not exist.
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/catalog")}
                        className="rounded-lg bg-[#242424] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#3A3A3A]"
                    >
                        Back to Catalog
                    </button>
                </div>
            )}

            {/* API Error State */}
            {!isLoading && error && (
                <div className="py-20 text-center">
                    <h2 className="mb-3 text-2xl font-bold text-[#242424]">
                        Something Went Wrong
                    </h2>

                    <p className="mb-6 text-stone-500">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/catalog")}
                        className="rounded-lg bg-[#242424] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#3A3A3A]"
                    >
                        Back to Catalog
                    </button>
                </div>
            )}

            {/* Product Detail */}
            {!isLoading && !error && product && (
                <>
                    <button
                        type="button"
                        onClick={() => navigate("/catalog")}
                        className="mb-6 inline-flex items-center gap-2 rounded-lg border border-[#242424] px-4 py-2 text-sm font-medium text-[#242424] transition hover:bg-[#242424] hover:text-white"
                    >
                        ← Back to Catalog
                    </button>

                    <section className="grid grid-cols-1 items-start gap-10 md:grid-cols-2">

                        {/* Product Gallery */}
                        <div>
                            {/* Main Image */}
                            <img
                                src={selectedImage || product.thumbnail}
                                alt={product.title}
                                className="mb-6 h-72 w-full rounded-2xl bg-white object-contain p-6"
                            />

                            {/* Thumbnail List */}
                            <div className="mt-4 flex flex-wrap gap-3">
                                {product.images?.map((image, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setSelectedImage(image)}
                                        aria-label={`View image ${index + 1} of ${product.title}`}
                                        aria-pressed={selectedImage === image}
                                        className={`h-20 w-20 cursor-pointer rounded-lg border bg-white p-2 transition ${
                                            selectedImage === image
                                                ? "border-[#242424] ring-2 ring-[#242424]/20"
                                                : "border-[#E5E0D8]"
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt=""
                                            className="h-full w-full object-contain"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Information */}
                        <div>
                            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-stone-500">
                                {product.category}
                            </p>

                            <h1 className="mb-4 text-3xl font-bold tracking-tight text-[#242424] md:text-4xl">
                                {product.title}
                            </h1>

                            {/* Rating */}
                            <div className="mb-5 flex items-center gap-2 text-sm text-stone-600">
                                <span className="text-amber-500">★</span>
                                <span className="font-semibold">
                                    {product.rating}
                                </span>
                                <span className="text-stone-400">/ 5</span>
                            </div>

                            {/* Price */}
                            <p className="mb-6 text-2xl font-bold text-[#242424]">
                                ${product.price.toLocaleString("en-US")}
                            </p>

                            {/* Description */}
                            <p className="text-base leading-7 text-stone-600">
                                {product.description}
                            </p>

                            {/* Additional Information */}
                            <div className="mt-6 space-y-3 border-t border-[#E5E0D8] pt-5 text-sm">
                                <p className="text-stone-600">
                                    Brand:{" "}
                                    <span className="font-semibold text-[#242424]">
                                        {product.brand || "Brand tidak tersedia"}
                                    </span>
                                </p>

                                <p className="text-stone-600">
                                    Stock:{" "}
                                    <span className="font-semibold text-[#242424]">
                                        {product.stock} units
                                    </span>
                                </p>
                            </div>
                        </div>

                    </section>
                </>
            )}

        </main>
    );
}

export default ProductDetail;
