import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <h3>¡Ups! Algo salió mal</h3>
      <p>{message || 'No pudimos cargar los datos. Por favor, intenta de nuevo más tarde.'}</p>
    </div>
  );
};

export default ErrorMessage;