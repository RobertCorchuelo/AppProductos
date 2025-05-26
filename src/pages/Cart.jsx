import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart
  } = useCart();

  const total = getCartTotal();

  // Vaciar carrito y restaurar el stock
  const handleClearCart = () => {
    cartItems.forEach(item => {
      const id = item.id;
      const stock = sessionStorage.getItem(`stock_${id}`);
      const restoredStock = parseInt(stock || 0) + item.quantity;
      sessionStorage.setItem(`stock_${id}`, restoredStock);
    });

    clearCart();
  };

  // Simular pago exitoso: no se restaura el stock
  const handleCheckout = () => {
    alert("¡Compra realizada con éxito! Gracias por tu pedido.");
    clearCart(); // Aquí NO restauramos el stock
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h1>Tu carrito está vacío</h1>
        <p>Parece que no has agregado ningún producto a tu carrito todavía.</p>
        <Link to="/" className="continue-shopping">
          Ir a comprar
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Tu Carrito</h1>
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p className="price">${item.price.toFixed(2)}</p>
            </div>
            <div className="cart-item-actions">
              <div className="quantity-control">
                <button
                  onClick={() => {
                    updateQuantity(item.id, item.quantity - 1);
                    const stock = parseInt(sessionStorage.getItem(`stock_${item.id}`) || "0");
                    sessionStorage.setItem(`stock_${item.id}`, stock + 1);
                  }}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => {
                    const stock = sessionStorage.getItem(`stock_${item.id}`);
                    if (stock && parseInt(stock) > 0) {
                      updateQuantity(item.id, item.quantity + 1);
                      sessionStorage.setItem(`stock_${item.id}`, parseInt(stock) - 1);
                    } else {
                      alert("No hay más stock disponible.");
                    }
                  }}
                >
                  +
                </button>
              </div>
              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button 
                className="remove-button"
                onClick={() => {
                  // Restaurar stock al eliminar producto individual
                  const stock = sessionStorage.getItem(`stock_${item.id}`);
                  const restoredStock = parseInt(stock || 0) + item.quantity;
                  sessionStorage.setItem(`stock_${item.id}`, restoredStock);
                  removeFromCart(item.id);
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="cart-actions">
          <button className="clear-cart" onClick={handleClearCart}>
            Vaciar carrito
          </button>
          <Link to="/products" className="continue-shopping">
            Seguir comprando
          </Link>
          <button className="checkout-button" onClick={handleCheckout}>
            Proceder al pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;