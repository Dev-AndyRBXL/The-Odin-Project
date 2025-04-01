import React, { useEffect, useState } from 'react';
import fetchProducts from '../fetch/fetchProducts';
import Products from '../components/market/Products';
import '../styles/market/General.css';

export default function General() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // fetch mock products
    (async () => {
      const data = await fetchProducts();
      setProducts(data);
    })();
  }, []);

  return (
    <div className="products">
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <Products products={products} />
      )}
    </div>
  );
}
