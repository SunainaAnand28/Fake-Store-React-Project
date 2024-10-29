import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import Cart from './Cart';
import './Navbar.css';

function Navbar() {
  const { cart } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="navContainer">
      <ul className="navbar">
        <li>Home</li>
        <li>Products</li>
        <li>Contact</li>
        <li onClick={toggleCart} className="cart-link">
          Cart ({cartItemCount})
        </li>
      </ul>
      {isCartOpen && (
        <div className="cart-dropdown">
          <Cart /> 
        </div>
      )}
    </div>
  );
}

export default Navbar;
