import Footer from './components/Footer';
import NavBar from './components/NavBar';
import AppRoutes from './routes/AppRoutes';
import { useLoginService } from './services/LoginService';
import { useWishlistService } from './services/WishlistService';

function App() {
    const loginService = useLoginService();
    const wishlistService = useWishlistService();

    return (
        <>
            <NavBar 
                isLoggedIn={loginService.isLoggedIn}
                onLogout={loginService.handleLogout}
            />
            <AppRoutes
                loginService={loginService}
                wishlistService={wishlistService}
            />
            <Footer />
        </>
    );
}

export default App