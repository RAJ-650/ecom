import React, { useState } from "react";
import { Link } from "react-router-dom";


const ProductCard = ({product}) => {
    
    return (
        <div className="card">
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
          />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">${product.price}</p>
            <a
              href={`/product/${product.id}`}
              className="btn btn-primary"
            >
              View Details
            </a>
          </div>
        </div>
        
    );
  };

export default ProductCard;
