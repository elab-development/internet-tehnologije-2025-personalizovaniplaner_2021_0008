import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './page/Home/Home';
import About from './page/About/About';
import { AuthProvider } from "./auth/AuthContext";
import Profile from './page/Profile/Profile';
import AuthPage from './components/Auth/AuthPage';
import ProtectedRoute from './auth/ProtectedRoute';
import ProductDetail from './page/ProductDetail/ProductDetail';
import { CartProvider, useCart } from './contexts/CartContext';
import AdminPanel from './page/Admin/AdminPanel';
import PersonalPlannerDetail from './page/PersonalPlannerDetail/PersonalPlannerDetail';
import { SearchProvider } from './contexts/SearchContext';  

function AppContent() {
  const { addToCart } = useCart();

  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/product/:productId' element={<ProductDetail addToCart={addToCart} />}/>
          <Route path='/personal-planner/:productId' element={<PersonalPlannerDetail addToCart={addToCart} />}/>
          <Route path='/login' element={<AuthPage />}/>
          <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
          <Route path='/admin' element={<ProtectedRoute><AdminPanel/></ProtectedRoute>} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <SearchProvider> 
        <AppContent />
      </SearchProvider>
    </CartProvider>
  );
}

export default App;

