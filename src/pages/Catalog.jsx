import { useEffect, useState } from "react"
import { getAllProducts } from '../services/ProductService'


function Catalog() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

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
                <p>Total products : {products.length}</p>
            )}
        </main>
    )
}

export default Catalog