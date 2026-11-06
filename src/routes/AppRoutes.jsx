import { Routes, Route } from 'react-router-dom'
import Catalog from '../pages/Catalog'
import ProductDetail from '../pages/ProductDetail'

function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<div>Home Page</div>} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/products/:id' element={<div>{<ProductDetail />}</div>} />
            <Route path='/login' element={<div>Login Page</div>} />
            <Route path='/wishlist' element={<div>Wishlist</div>} />
            <Route path='*' element={<div>404 - Page not found!</div>} />
        </Routes>
    )
}

export default AppRoutes