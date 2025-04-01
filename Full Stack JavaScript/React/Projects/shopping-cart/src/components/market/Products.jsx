import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/CartContext';
import '../../styles/market/Products.css';

export default function Products({ products }) {
  const { userCart, setUserCart, setCartCount } = useContext(CartContext);

  const addItemToCart = (product, event) => {
    event.stopPropagation(); // Prevent triggering parent container click
    
    if (!userCart) return;
    
    const updatedCart = { ...userCart };
    const existingProduct = updatedCart.products.find(
      (item) => item.productId === product.id
    );
    
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      updatedCart.products.push({
        ...product,
        productId: product.id,
        quantity: 1,
      });
    }
    
    setUserCart(updatedCart);
    setCartCount(
      updatedCart.products.reduce((total, item) => total + item.quantity, 0)
    );
    
    // Add visual feedback
    const button = event.currentTarget;
    button.classList.add('added');
    setTimeout(() => button.classList.remove('added'), 500);
  };

  const viewProductDetails = (product) => {
    // You could implement navigation to product details page
    console.log(`Viewing details for ${product.title}`);
    // Example: history.push(`/product/${product.id}`);
  };
  
  return (
    <div className="products">
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            id={product.secureId}
            className="product-item"
            data-index={product.id}
          >
            <div 
              className="product-item-container" 
              role="button" 
              tabIndex="0"
              onClick={() => viewProductDetails(product)}
              onKeyPress={(e) => e.key === 'Enter' && viewProductDetails(product)}
            >
              <div className="cover">
                <img
                  className="cover-img"
                  src={product.image}
                  alt={`${product.title} image`}
                  loading="lazy"
                />
                <div className="image-overlay">
                  <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
                  <span>View Details</span>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-desc">{product.description}</p>
                <div className="product-price">
                  {product.price && (
                    <span className="price">${product.price.toFixed(2)}</span>
                  )}
                </div>
              </div>
              <button 
                onClick={(e) => addItemToCart(product, e)} 
                className="add-btn" 
                title="Add to cart"
                aria-label={`Add ${product.title} to cart`}
              >
                <FontAwesomeIcon icon={faCartPlus} />
                <span>Add to Cart</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}