import { useEffect, useState } from "react"
import { getAllProducts } from '../services/ProductService'
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

function Catalog() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const handleDetailClick = (product) => {
        navigate(`/products/${product.id}`);
    };
    const filteredProducts = products.filter((product) =>
        {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || (product.brand || "").toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
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

    return (
        <main>
            <h1>Product Catalog</h1>
            <p>Explore our collection of products.</p>

            {/* Search Product */}
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-lg border border-[#E5E0D8] bg-white px-4 py-3 text-sm text-[#242424] outline-none transition focus:border-[#242424] sm:max-w-md"
                />
                
                {/* Filter Category */}
                <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="w-full rounded-lg border border-[#E5E0D8] bg-white px-4 py-3 text-sm text-[#242424] outline-none transition focus:border-[#242424] sm:max-w-xs">
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {isLoading && <p>Loading products...</p>}

            {error && <p>{error}</p>}

            {!isLoading && !error && (
                <>
                    <p>Total products : {filteredProducts.length}</p>

                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {filteredProducts.length > 0 ? ( filteredProducts.map((product) => (
                                    <ProductCard
                                    key={product.id}
                                    product={product}
                                    onDetailClick={handleDetailClick}/>
                                ))
                            ) : (
                            <p className="col-span-full py-12 text-center text-stone-500">
                                No products found. Try another keyword.
                            </p>
                        )} 
                    </div>
                </>
            )}
        </main>
    )
}

export default Catalog