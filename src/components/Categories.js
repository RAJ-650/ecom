import React, { useEffect, useState } from "react";
import './Categories.css'; // Import the CSS file for categories
import { fetchCategories } from "../api";
import { Link } from "react-router-dom";

const Categories = () => {

const [categoriesval, setCategories] = useState([]);
  const [loading, updateLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchapiCategories = async () => {
      try {
        const categoriesData = await fetchCategories(); // Replace with your API endpoint
        console.log("categoriesData",categoriesData);
        setCategories(categoriesData);
      } catch (error) {
        setError(error.message);
      } finally {
        updateLoading(false);
      }
    };
    console.log('Categories:', categoriesval);
    fetchapiCategories();
  }, []);


  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }


  return (
    <div className="categories-section bg-texture"  style={{  backgroundImage: `url(${process.env.PUBLIC_URL}/images/txtr.jpg)` }}>
      <h2 className="categories-title">Shop by Category</h2>
      <div className="categories-container">
      {categoriesval ? categoriesval.map(
              (
                category // Display first 3 products as featured
              ) => (
                <div key={category.id} className="category-card">
                  <div className="card">
                    <img
                      src={category.image}
                      className="card-img-top"
                      alt="Category 1"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{category.name}</h5>
                      <p className="card-text">{category.description}</p>
                      <Link
                        to={`/products?category=${category.id}`}
                        className="btn btn-primary"
                      >
                        View Products
                      </Link>
                    </div>
                  </div>
                </div>
              )
            ) : ""}        
      </div>
    </div>
  );
};

export default Categories;
