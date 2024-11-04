import React, { useEffect, useState } from "react";
import { fetchProducts,  } from "../api";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import { useUser } from "../UserContext";

const Home = ({ loggedInUser }) => {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const { checkAuth, loading, updateLoading } = useUser(); // Access user data

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await fetchProducts();
        const filteredProducts = productData;
        setProducts(filteredProducts);

      } catch (err) {
        setError(err.message);
      } finally {
        updateLoading(false);
      }
    };

    getProduct();
  }, []); // Depend on location.search to update when it changes

  return (
    <>
      <Banner />
      <Categories /> 
      <div className="bg-purple">
      <div className="container pt-2 pb-2 mb-4">
        <div className="row ">
          <div className="col-12 mb-4 mt-5">
            <h2 className="text-center ">Recent Products</h2>
          </div>
        </div>
        <div className="row ">
          {products &&
            products.map(
              (
                product // Display first 3 products as featured
              ) => (
                <div key={product.id} className="col-3">
                  <div className="card mb-4">
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
                        className="btn btn-primary text-center"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              )
            )}
        </div>
      </div></div> 
    </>
  );
};

export default Home;
