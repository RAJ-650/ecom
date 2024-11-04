import React from "react";
import { Link } from "react-router-dom";


const AboutUs = () => {
  return (
    <>      
       
       <div className="container mt-5 mb-5">
            <div className="page-title-section text-center mb-4">                
                <h1 className="page-title animate__animated animate__fadeInDown">About Us</h1>
                <p className="page-subtitle animate__animated animate__fadeIn animate__delay-1s">
                    Learn more about our mission and values.
                </p>
                <nav aria-label="breadcrumb" className="breadcrumb-container">
                    <ol className="breadcrumb justify-content-center">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">About Us</li>
                    </ol>
                </nav>
            </div>

            <p className="animate__animated animate__fadeIn animate__delay-2s">
                We are a passionate team dedicated to providing the best eCommerce experience for our customers. 
                Our goal is to make online shopping simple, secure, and enjoyable.
            </p>
            <p className="animate__animated animate__fadeIn animate__delay-3s">
                Our diverse range of products is carefully curated to meet the needs of our customers. 
                We believe in quality, affordability, and exceptional customer service.
            </p>
            <div className="row mt-5">
                <div className="col-md-6 animate__animated animate__fadeInLeft animate__delay-4s">
                    <h4>Our Mission</h4>
                    <p>
                        To provide a seamless shopping experience while delivering high-quality products at great prices.
                    </p>
                </div>
                <div className="col-md-6 animate__animated animate__fadeInRight animate__delay-4s">
                    <h4>Our Vision</h4>
                    <p>
                        To be the leading eCommerce platform, recognized for our commitment to customer satisfaction.
                    </p>
                </div>
            </div>
        </div>
    </>);
  
};

export default AboutUs;
