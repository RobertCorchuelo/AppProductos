import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart'; // Nueva página de carrito
import Navbar from './components/NavBar';
import { CartProvider } from './context/CartContext'; // Importamos el provider
import './styles/main.scss';
import BackgroundAudio from './components/BackgroundSound'; // importar el sonido

function App() {
  return (
    <CartProvider>
      <Router>
      <BackgroundAudio /> {/* Se mantiene durante toda la navegación */}
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} /> {/* Ruta para la página de inicio */}
              <Route path="/products" element={<ProductList />} /> {/* Cambiamos la ruta de productos */}
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;