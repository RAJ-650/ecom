import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({loggedInUser}) => {

  return (
    <>
    <footer className="text-purple">
        <div className="container text-center pt-3">
          <p>© 2024 BrandName. All Rights Reserved.</p>
        </div>
      </footer>
        
        </>
   
  );
};

export default Footer;