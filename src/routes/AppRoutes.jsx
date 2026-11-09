import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import ProductDetail from "../pages/ProductDetail";
import LoginPage from "../pages/LoginPage";
import Wishlist from "../pages/Wishlist";
import NotFound from "../pages/NotFound";

function AppRoutes({ loginService, wishlistService }) {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Home 
                    wishlistService={wishlistService}
                    isLoggedIn={loginService.isLoggedIn} />
                }
            />

            <Route
                path="/catalog"
                element={
                    <Catalog wishlistService={wishlistService}
                    isLoggedIn={loginService.isLoggedIn} />
                }
            />

            <Route
                path="/products/:id"
                element={
                    <ProductDetail
                        wishlistService={wishlistService}
                        isLoggedIn={loginService.isLoggedIn}
                    />
                }
            />

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

            <Route
                path="/wishlist"
                element={
                    loginService.isLoggedIn ? (
                        <Wishlist wishlistService={wishlistService} />
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;