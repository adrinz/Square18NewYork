import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/common';
import {
  HomePage,
  ProductsPage,
  AboutPage,
  WholesalePage,
  ContactPage,
  ShippingPage,
} from './pages';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/wholesale" element={<WholesalePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/returns" element={<ShippingPage />} />
        <Route path="/faq" element={<ContactPage />} />
        <Route path="/privacy" element={<ShippingPage />} />
        <Route path="/terms" element={<ShippingPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
