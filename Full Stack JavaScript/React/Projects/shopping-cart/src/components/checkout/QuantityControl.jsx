import React from 'react';
import '../../styles/checkout/QuantityControl.css';

const QuantityControl = ({ quantity, onChange }) => {
  return (
    <div className="quantity-control">
      <button
        className="quantity-btn"
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= 1}
      >
        -
      </button>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => onChange(parseInt(e.target.value))}
        readOnly
        className="quantity-input"
      />
      <button className="quantity-btn" onClick={() => onChange(quantity + 1)}>
        +
      </button>
    </div>
  );
};

export default QuantityControl;
