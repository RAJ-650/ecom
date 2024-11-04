// src/components/Wishlist.js
import React from 'react';

const Wishlist = () => {
  const wishlistItems = []; // Replace this with state or props if you have dynamic data.

  return (
    <div>
      <h1>My Wishlist</h1>
      {wishlistItems.length > 0 ? (
        <ul>
          {wishlistItems.map((item, index) => (
            <li key={index}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your wishlist is currently empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
