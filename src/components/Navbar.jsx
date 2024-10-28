import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import './Navbar.css';

function Navbar() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false); // State to toggle cart display

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0); // Calculate total number of items in the cart

  return (
    <div className='navContainer'>
      <ul className="navbar">
        <li>Home</li>
        <li>Products</li>
        <li>Contact</li>
        <li onClick={toggleCart} className="cart-link">
          Cart ({cartItemCount}) {/* Display total quantity of items */}
        </li>
      </ul>
      {isCartOpen && (
        <div className="cart-dropdown">
          <h4>Shopping Cart</h4>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h5>{item.title}</h5>
                    <p>Price: ${item.price}</p>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="remove-button">Remove</button>
                  </div>
                </div>
              ))}
              <div className="cart-total">
                <h4>
                  Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </h4>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
