import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { getCartItemsCount } = useCart();
  const itemCount = getCartItemsCount();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
        <p><img src="/src/assets/Nebula.png" alt="NebulaCorp Logo" className="logo" />NebulaCorp</p>
        </Link>
        <div className="navbar-links">

            <Link to="/products" className="navbar-link">
                Productos
            </Link>

          <Link to="/cart" className="cart-icon">
          <img src="/src/assets/carrito_compras.png" alt="NebulaCorp Logo" className="cart_logo" />          
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;