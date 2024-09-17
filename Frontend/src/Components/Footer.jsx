import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            E-Shop is your one-stop online store offering a wide range of
            products across multiple categories. Shop with confidence!
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@eshop.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Address: 123 E-Shop Lane, City, Country</p>
        </div>

        {/* Social Media Section */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">📘</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📷</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">🔗</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 E-Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
