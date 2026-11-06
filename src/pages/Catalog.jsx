import { useEffect, useState } from "react"
import { getAllProducts } from '../services/ProductService'
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

function Catalog() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleDetailClick = (product) => {
        navigate(`/products/${product.id}`);
    };

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

            {isLoading && <p>Loading products...</p>}

            {error && <p>{error}</p>}

            {!isLoading && !error && (
                <>
                    <p>Total products : {products.length}</p>

                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => (  
                            <ProductCard
                                key={product.id}
                                product={product}
                                onDetailClick={handleDetailClick}
                             />
                        ))}
                    </div>
                </>
            )}
        </main>
    )
}

export default Catalog