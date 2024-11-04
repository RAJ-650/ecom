// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import './Cart.css'; // Import the CSS file for styling
import { addToCart, placeOrder } from '../api';

import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = 1; // Assuming user ID is stored in user object

  // Load cart items from local storage or an API
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const handleCheckout = async () => {
    const order = {
        items: cartItems,
        date: new Date(),
        user: userId,
    };
    const response = await placeOrder(userId, order);
    if (response) {
        alert('Order placed successfully!');
        localStorage.removeItem('cart'); // Clear cart after order
        setCartItems([]);
    }
};

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
  };

  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="page-title-section text-center mb-4">
        <h1 className="page-title animate__animated animate__fadeInDown">
        Your Cart
        </h1>
        <p className="page-subtitle animate__animated animate__fadeIn animate__delay-1s">
          update your cart.
        </p>
      </div>
    <div className="container">
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/products">Continue Shopping</Link></p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                    style={{ width: '60px' }}
                  />
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => handleRemoveItem(item.id)} className="btn btn-danger">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {cartItems.length > 0 && (
        <div className="total">
          <h3>Total: ${calculateTotal()}</h3>
          <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div></div>
  );
};

export default Cart;
