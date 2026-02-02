import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './page/Home/Home';
import About from './page/About/About';

function App() {
  return (
    <>
    <Header />
      <Routes>
        <Route path = '/' element = {<Home />}/>
        <Route path = '/about' element = {<About />}/>
      </Routes>
    <Footer />
    </>
  );
}

export default App;
