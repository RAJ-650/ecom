import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  fetchProducts,
  fetchProductsByCategoryId,
  fetchCategories,
} from "../api"; // Ensure this fetches all products or categories if needed
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import ProductCard from "../components/ProductCard";
import { useUser } from "../UserContext";

const Products = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("category");
  const searchTerm = queryParams.get("search"); // Get the search term from query params
  const [error, setError] = useState(null);
  const [categoriesval, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { checkAuth, loading, updateLoading } = useUser(); // Access user data

  useEffect(() => { 


    const fetchCategoriesData = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };

    if (categoryId && categoryId > 0) {
      setSelectedCategory(categoryId);
    }

    fetchCategoriesData();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let finalFilteredProducts = [];
        // if (categoryId && categoryId > 0) {
        //   finalFilteredProducts = await fetchProductsByCategoryId(categoryId); // Fetch all products
        // } else {
        //   finalFilteredProducts = await fetchProducts(); // Fetch all products
        // }
        finalFilteredProducts = await fetchProducts(); // Fetch all products

        setProducts(finalFilteredProducts);
        console.log(finalFilteredProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        updateLoading(false);
      }
    };

    getProducts();
  }, [categoryId, searchTerm]); // Depend on categoryId and searchTerm

  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedCategory > 0) {
        const data = await fetchProductsByCategoryId(selectedCategory);
        setProducts(data);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = async  (categoryId) => {
    if(categoryId > 0)
    {
      setSelectedCategory(categoryId);
    }else{
      setSelectedCategory(null);
      const allProducts = await fetchProducts(); // Fetch all products

        setProducts(allProducts);
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error fetching products: {error}</div>;
  }

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

      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h4>Categories</h4>
            <ul className="list-group">
            <li
                    key="0"
                    className={`list-group-item ${
                      !selectedCategory  ? "active" : ""
                    }`}
                    onClick={() => handleCategoryChange(0)}
                    style={{ cursor: "pointer" }}
                  >
                    All Category
                  </li>
              {categoriesval &&
                categoriesval.map((category) => (
                  <li
                    key={category.id}
                    className={`list-group-item ${
                      selectedCategory == category.id ? "active" : ""
                    }`}
                    onClick={() => handleCategoryChange(category.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {category.name}
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-md-9">
            <div className="row">
              {products && Array.isArray(products) ? (
                products.map((product) => (
                  <div key={product.id} className="col-md-4 mb-4">
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <p>No Product Available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
