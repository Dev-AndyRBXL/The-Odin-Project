import React, { createContext, useState, useEffect } from 'react';
import fetchCarts from '../fetch/fetchCarts';

export const CartContext = createContext(0);

export function CartProvider({ children }) {
  const [carts, setCarts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [userCart, setUserCart] = useState(null);

  useEffect(() => {
    if (carts.length === 0) {
      const fetchCartData = async () => {
        try {
          const fetchedCarts = await fetchCarts();
          setCarts(fetchedCarts);

          const firstCart = fetchedCarts.length > 0 ? fetchedCarts[0] : null;
          setUserCart(
            firstCart ? { ...firstCart, products: [] } : { products: [] }
          );

          const count =
            userCart?.products.reduce(
              (total, item) => total + (item.quantity || 1),
              0
            ) || 0;
          setCartCount(count);
        } catch (error) {
          console.error('Failed to fetch carts:', error);
        }
      };

      fetchCartData();
    }
  }, [carts]);

  return (
    <CartContext.Provider
      value={{ carts, cartCount, userCart, setCartCount, setUserCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
