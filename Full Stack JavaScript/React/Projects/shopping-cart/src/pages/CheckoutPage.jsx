import React, { useEffect, useState } from 'react';
import Header from '../components/general/Header';
import { useLocation } from 'react-router-dom';
import fetchProducts from '../fetch/fetchProducts';
import CartItemsList from '../components/checkout/CartItemsList';
import CheckoutSummary from '../components/checkout/CheckoutSummary';
import LoadingState from '../components/checkout/LoadingState';
import '../styles/checkout/CheckoutPage.css';

export default function CheckoutPage() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const location = useLocation();
  const cart = location.state?.cart || { products: [] };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);

        if (cart?.products?.length) {
          const initialQuantities = {};
          cart.products.forEach((item) => {
            initialQuantities[item.productId] = item.quantity || 1;
          });
          setQuantities(initialQuantities);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [cart]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: newQuantity,
      }));
    }
  };

  const getCartItems = () => {
    if (!products.length || !cart.products.length) return [];

    const cartMap = new Map(
      cart.products.map((p) => [p.productId, p.quantity || 1])
    );

    return products
      .filter((product) => cartMap.has(product.id))
      .map((product) => ({
        ...product,
        quantity: quantities[product.id] || cartMap.get(product.id),
      }));
  };

  const calculateSubtotal = () => {
    return getCartItems().reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const cartItems = getCartItems();
  const subtotal = calculateSubtotal();
  const shipping = cart?.products?.length ? 5.99 : 0.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (isLoading) {
    return (
      <>
        <Header />
        <LoadingState />
      </>
    );
  }  

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <div className="checkout">
            <CartItemsList
              cartItems={cartItems}
              onQuantityChange={handleQuantityChange}
            />
            <CheckoutSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
            />
          </div>
        </div>
      </main>
    </>
  );
}
