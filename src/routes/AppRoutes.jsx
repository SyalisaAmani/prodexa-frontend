import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import ProductDetail from "../pages/ProductDetail";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/catalog" element={<Catalog />} />

            <Route path="/products/:id" element={<ProductDetail />} />

            <Route path="/login" element={<div>Login Page</div>} />

            <Route path="/wishlist" element={<div>Wishlist</div>} />

            <Route path="*" element={<div>404 - Page not found!</div>} />
        </Routes>
    );
}

export default AppRoutes;