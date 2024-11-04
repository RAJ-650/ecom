// src/UserContext.js

import React, { createContext, useState, useContext } from 'react';

// Create a Context
const UserContext = createContext();

// Create a Provider Component
export const UserProvider = ({ children }) => {
    const [error, setError] = useState(null); // User data
    const [user, setUser] = useState(null); // User data
    const [loading, setLoading] = useState(true); // Loading state

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('loggedInUser', JSON.stringify(userData));
        setLoading(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('cart');
    };

    const updateUser = (updatedData) => {
        setUser((prevUser) => ({ ...prevUser, ...updatedData }));
    };

    const checkAuth = () => {
        const savedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (savedUser) {
            setUser(savedUser);
        }
        setLoading(false);
    };

    const updateLoading = (data) => {
        setLoading(data);
    };

    const updateError = (data) => {
        setError(data);
    };



    return (
        <UserContext.Provider value={{ user, login, logout, updateUser, loading, checkAuth,updateError,error,updateLoading }}>
            {children}
        </UserContext.Provider>
    );
};

// Create a custom hook to use the UserContext
export const useUser = () => {
    return useContext(UserContext);
};
