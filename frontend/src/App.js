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


function App() {
  return (
    <>
     <AuthProvider>
      
    <Header />
      <Routes>
        <Route path = '/' element = {<Home />}/>
        <Route path = '/about' element = {<About />}/>
        <Route path = '/login' element = {<AuthPage />}/>
        <Route 
          path='/profile'
          element={<ProtectedRoute> <Profile/> </ProtectedRoute>} />
          
      </Routes>
    <Footer />
      
    </AuthProvider>
    </>
  );
}

export default App;
