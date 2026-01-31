import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './page/Home/Home';

function App() {
  return (
    <>
    <Header />
      <Routes>
        <Route path = '/' element = {<Home />}/>
      </Routes>
    <Footer />
    </>
  );
}

export default App;
