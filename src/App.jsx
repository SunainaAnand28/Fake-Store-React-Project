import React from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import { CartProvider } from './components/CartContext';
import Footer from './components/Footer'

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Card />
      <Footer/>
    </CartProvider>
  );
}

export default App;
