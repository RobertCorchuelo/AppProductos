import React from 'react';
import { Link } from 'react-router-dom';
import clickSound from '../assets/sounds/compra.mp3';


const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Bienvenido a NebulaCorp</h1>
          <p>Descubre nuestra selección de productos de alta calidad a los mejores precios.</p>
          <Link to="/products" className="cta-button">
            Ver Productos
          </Link>
        </div>
        <div className="hero-image">
          {/* Aquí podría ir una imagen decorativa */}
        </div>
      </div>
      
      <div className="features-section">
        <div className="feature">
          <div className="feature-icon">
            <span className="material-icons">
            <img src="/src/assets/Envio_gratis.png" alt="NebulaCorp Logo" className="logo1" />
            </span>
          </div>
          <h3>Envío Gratis</h3>
          <p>En todas tus compras superiores a $50</p>
        </div>
        
        <div className="feature">
          <div className="feature-icon">
            <span className="material-icons">   
            <img src="/src/assets/pago_seguro.png" alt="NebulaCorp Logo" className="logo1" />
            </span>
            
          </div>
          <h3>Pago Seguro</h3>
          <p>Tus datos siempre protegidos</p>
        </div>
        
        <div className="feature">
          <div className="feature-icon">
            <span className="material-icons">
            <img src="/src/assets/soporte.png" alt="NebulaCorp Logo" className="logo1" />
            </span>
          </div>
          <h3>Soporte 24/7</h3>
          <p>Estamos aquí para ayudarte</p>
        </div>
      </div>
    </div>
  );
};

export default Home;