import Footer from './components/Footer';
import NavBar from './components/NavBar';
import AppRoutes from './routes/AppRoutes';
import { useLoginService } from './services/LoginService';

function App() {
    const loginService = useLoginService();

    return (
        <>
            <NavBar 
                isLoggedIn={loginService.isLoggedIn}
                onLogout={loginService.handleLogout}
            />
            <AppRoutes
                loginService={loginService}
            />
            <Footer />
        </>
    );
}

export default App