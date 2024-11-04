import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { fetchProductById } from "../api"; // Assume this function is set up to fetch a product by ID
import Navbar from "../components/Navbar";
import { useUser } from "../UserContext";

const Product = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { user, checkAuth, loading, updateLoading } = useUser(); // Access user data
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        console.log(id);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        updateLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const addToCart = () => {

    if (!user) {
      // User is not logged in, redirect to login page
      navigate("/login");
    } else {
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      const productInCart = existingCart.find((item) => item.id === product.id);
      if (productInCart) {
        productInCart.quantity += 1;
      } else {
        existingCart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(existingCart));
      alert("Product added to cart!");    }



  };

  if (!product) return <div>Loading...</div>;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-5 mb-5">
      <div className="page-title-section text-center mb-4">
        <h1 className="page-title animate__animated animate__fadeInDown">
          Products
        </h1>
        <p className="page-subtitle animate__animated animate__fadeIn animate__delay-1s">
          Buy your products.
        </p>
      </div>
      <div className="container my-5">
        <div
          className="row shadow-lg p-3 mb-5 bg-body rounded"
          style={{ border: "1px solid #6f42c1" }}
        >
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded"
              style={{ animation: "fadeIn 1s" }}
            />
          </div>
          <div className="col-md-6">
            <h2 className="text-purple">{product.name}</h2>
            <p className="text-muted">{product.description}</p>
            <h4 className="text-success">${product.price.toFixed(2)}</h4>
            <button
              className="btn btn-purple mt-3"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Product;
