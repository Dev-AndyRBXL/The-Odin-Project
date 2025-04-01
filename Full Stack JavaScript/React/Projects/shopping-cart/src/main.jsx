import React from 'react';
import { createRoot } from 'react-dom/client';
import { CartProvider } from './context/CartContext'; // Import CartProvider
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import DefaultPage from './components/general/DefaultProfile';
import Market from './pages/Market';
import General from './pages/General';
import CheckoutPage from './pages/CheckoutPage';

const router = createBrowserRouter([
  { path: '/', element: <App />, errorElement: <ErrorPage /> },
  {
    path: '/market',
    element: <Market />,
    children: [
      { index: true, element: <DefaultPage /> },
      { path: 'general', element: <General /> },
      // { path: 'apparel', element: <Apparel /> },
      // { path: 'accessories', element: <Accessories /> }
    ],
  },
  { path: '/checkout', element: <CheckoutPage /> },
]);

createRoot(document.getElementById('root')).render(
  <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>
);
