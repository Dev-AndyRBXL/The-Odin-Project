import React from 'react';
import { CartProvider } from './context/CartContext'; // Import CartProvider
import Header from './components/general/Header';
import './index.css';
import './styles/general/App.css';

function App() {
  return (
    <CartProvider>
      <Header />
    </CartProvider>
  );
}

export default App;
