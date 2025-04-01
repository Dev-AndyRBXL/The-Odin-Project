import React from 'react';
import QuantityControl from './QuantityControl';
import '../../styles/checkout/CartItem.css';
import '../../styles/checkout/QuantityControl.css';

const CartItem = ({ item, onQuantityChange }) => {
  return (
    <li className="item" id={item.id}>
      <div className="item-container">
        <div className="item-cover">
          <img src={item.image} alt={`${item.title} cover`} />
        </div>
        <div className="item-info">
          <h3 className="item-title">{item.title}</h3>
          <p className="item-desc">{item.description}</p>
          <p className="item-price">${item.price?.toFixed(2)}</p>
        </div>
        <QuantityControl
          quantity={item.quantity}
          onChange={(newQuantity) => onQuantityChange(item.id, newQuantity)}
        />
      </div>
    </li>
  );
};

export default CartItem;
