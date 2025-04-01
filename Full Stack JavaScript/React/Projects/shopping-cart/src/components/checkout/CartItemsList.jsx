import React from 'react';
import CartItem from './CartItem';
import '../../styles/checkout/CartItemsList.css';

const CartItemsList = ({ cartItems, onQuantityChange }) => {
  if (!cartItems || cartItems.length === 0) {
    return <div className="empty-cart">Your cart is empty</div>;
  }

  return (
    <div className="cart-items">
      <h2>Your Cart</h2>
      <div className="items-container">
        <ul className="items-list">
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={onQuantityChange}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CartItemsList;