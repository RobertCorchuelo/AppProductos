import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import { useCart } from '../context/CartContext'; // Importamos el contexto del carrito
import clickSound from '../assets/sounds/compra.mp3';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [localStock, setLocalStock] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        const productoConStock = { ...response.data, stock: 10 };
        const savedStock = sessionStorage.getItem(`stock_${id}`);
        const stock = savedStock !== null ? parseInt(savedStock) : productoConStock.stock;

        setProduct(productoConStock);
        setLocalStock(stock);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  const handleAddToCart = () => {
    if (localStock <= 0) {
      alert("¡No hay stock disponible!");
      return;
    }

    const sonido = new Audio(clickSound);
    sonido.play();
    addToCart({ ...product });

    setLocalStock(prev => {
      const newStock = prev - 1;
      sessionStorage.setItem(`stock_${id}`, newStock);
      return newStock;
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="No se encontró el producto" />;

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.title}</h1>
          <p className="product-detail-category">Categoría: {product.category}</p>
          <p className="product-detail-price">Precio: ${product.price?.toFixed(2)}</p>
          <p className="product-detail-stock">Stock disponible: {localStock}</p>
          <div className="product-detail-description">
            <h3>Descripción:</h3>
            <p>{product.description}</p>
          </div>
          <div className="product-detail-actions">
            <button 
              className="product-detail-button back-button"
              onClick={() => window.history.back()}
            >
              Volver
            </button>
            <button 
              className="product-detail-button add-cart-button"
              onClick={handleAddToCart}
            >
              Agregar al carrito
            </button>
          </div>
          {addedToCart && (
            <div className="added-to-cart-message">
              ¡Producto agregado al carrito!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 