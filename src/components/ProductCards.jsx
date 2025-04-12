import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-card-content">
        <h3 className="product-card-title">{product.title}</h3>
        <p className="product-card-price">${product.price}</p>
        <Link to={`/product/${product.id}`} className="product-card-button">
          Ver detalles
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;