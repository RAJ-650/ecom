import React, { useState } from 'react';
import { placeOrder } from '../api';

const Order = () => {
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        zip: '',
    });
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const userId = JSON.parse(localStorage.getItem('user')).id; // Assuming user ID is stored

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress(prevAddress => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const order = {
            items: cartItems,
            address,
            date: new Date(),
        };
        await placeOrder(userId, order);
        alert('Order placed successfully!');
        localStorage.removeItem('cart'); // Clear cart after order
        setCartItems([]); // Clear local state
        // Optionally, redirect to a confirmation page or home
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Place Your Order</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Street Address</label>
                    <input
                        type="text"
                        className="form-control"
                        name="street"
                        value={address.street}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">City</label>
                    <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={address.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">State</label>
                    <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={address.state}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">ZIP Code</label>
                    <input
                        type="text"
                        className="form-control"
                        name="zip"
                        value={address.zip}
                        onChange={handleChange}
                        required
                    />
                </div>
                <h4 className="mt-4">Order Summary</h4>
                <ul className="list-group mb-3">
                    {cartItems.map(item => (
                        <li className="list-group-item" key={item.id}>
                            {item.name}
                        </li>
                    ))}
                </ul>
                <button type="submit" className="btn btn-primary">Submit Order</button>
            </form>
        </div>
    );
};

export default Order;
