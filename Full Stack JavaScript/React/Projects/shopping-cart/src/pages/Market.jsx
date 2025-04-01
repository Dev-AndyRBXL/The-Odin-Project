import React from 'react';
import Header from '../components/general/Header';
import { Outlet } from 'react-router-dom';
import MarketSidebar from '../components/market/MarketSidebar';
import '../styles/market/Market.css';

export default function Market() {
  return (
    <>
      <Header />
      <main className="market-container">
        <MarketSidebar />
        <div className="market-content">
          <div className="market-outlet">
            <h1 className="market-title">Market</h1>
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}
