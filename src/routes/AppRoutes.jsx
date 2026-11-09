import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import ProductDetail from "../pages/ProductDetail";
import LoginPage from "../pages/LoginPage";

function AppRoutes({ loginService }) {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/catalog" element={<Catalog />} />

            <Route path="/products/:id" element={<ProductDetail />} />

            <Route
            path="/login"
            element={<LoginPage 
                username={loginService.username}
                setUsername={loginService.setUsername}
                password={loginService.password}
                setPassword={loginService.setPassword}
                errorMessage={loginService.errorMessage}
                checkLogin={loginService.checkLogin}/>
                } 
            />

            <Route path="/wishlist" element={<div>Wishlist</div>} />

            <Route path="*" element={<div>404 - Page not found!</div>} />
        </Routes>
    );
}

export default AppRoutes;