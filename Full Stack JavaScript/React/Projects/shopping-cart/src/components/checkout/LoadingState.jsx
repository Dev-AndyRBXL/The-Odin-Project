import React from 'react';
import '../../styles/checkout/LoadingState.css';

const LoadingState = ({ message = 'Loading your cart...' }) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingState;
