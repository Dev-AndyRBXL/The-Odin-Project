import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartIcon from './CartIcon';
import { CartContext } from '../../context/CartContext';
import '../../styles/general/Header.css';

export default function Header() {
  const { userCart, cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCartClick = () => {
    if (userCart) {
      navigate(`/checkout?cartid=${userCart.id}&page=checkout`, {
        state: { cart: userCart },
      });
    }
  };

  return (
    <header className="site-header">
      <div className="header-wrapper">
        <h1 className="site-logo">
          <Link to="/">LOGO_HERE</Link>
        </h1>
        <div className="header-wrapper-right">
          <nav className="main-navigation">
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/market/general" className="nav-link">
                  Market
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/market/apparel" className="nav-link">
                  Apparel
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/market/accessories" className="nav-link">
                  Accessories
                </Link>
              </li>
            </ul>
          </nav>
          <button
            onClick={handleCartClick}
            className="cart-btn"
            aria-label="View shopping cart"
          >
            <span className="cart-badge">
              {(cartCount ?? 0) > 9 ? '9+' : cartCount}
            </span>
            <CartIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
