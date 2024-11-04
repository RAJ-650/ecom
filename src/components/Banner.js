import React from 'react';
import './Banner.css'; // Import custom styles for the banner

const Banner = () => {
  return (
    <div className="row"> <div className="col-12">
       <div className="banner" style={{  backgroundImage: `url(${process.env.PUBLIC_URL}/images/banner1.jpg)` }}>
      <div className="banner-content text-center text-white">
        <h1>Welcome to Our Online Store!</h1>
        <p>Your one-stop shop for amazing deals</p>
        <button className="btn btn-light btn-lg">Shop Now</button>
      </div>
    </div> </div></div>
    
  );
};

export default Banner;