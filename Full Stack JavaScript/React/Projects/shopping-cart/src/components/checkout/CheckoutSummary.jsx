import React from 'react';
import '../../styles/checkout/CheckoutSummary.css';

const CheckoutSummary = ({ subtotal, shipping, tax, total }) => {
  return (
    <div className="checkout-summary">
      <div className="summary-row">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Tax</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="summary-row total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button className="checkout-button" onClick={() => alert('Proceeding to checkout...')}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CheckoutSummary;