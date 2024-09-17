import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom'; // Import Link from react-router-dom

const Layout = () => {
  // State for category selection
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({});

  // Function to validate category selection
  const validateCategory = () => {
    if (!category) {
      setErrors({ category: 'Please select a category.' });
      return false;
    }
    setErrors({});
    return true;
  };

  return (
    <>
      <div className="navbar">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">E-Shop</Link>  {/* Use Link here */}
        </div>

        {/* Search Bar */}
        <div className="navbar-search">
          <input type="text" placeholder="Search for products..." />
          <button>Search</button>
        </div>

        {/* Navigation Links */}
        <ul className="navbar-links">
          <li><Link to="/home">Home</Link></li>

          {/* Dropdown for Category */}
          <li>
            <div className="dropdown">
              <label htmlFor="category-select">:</label>
              <select
                id="category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                onBlur={validateCategory}
                required
              >
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Food">Food</option>
                <option value="Books">Books</option>
                <option value="Others">Others</option>
              </select>
              {errors.category && <p className="error">{errors.category}</p>}
            </div>
          </li>

          <li><Link to="/offers">Offers</Link></li>        
          <li><Link to="/about">About</Link></li>        
          <li><Link to="/contact">Contact</Link></li>      
        </ul>

        {/* Icons: Cart, Wishlist, Account */}
        <div className="navbar-icons">
          <Link to="/wishlist" className="icon">❤️</Link> {/* Link for icons */}
          <Link to="/cart" className="icon">🛒 <span className="cart-count">3</span></Link>
          <Link to="/login" className="icon">👤</Link>
        </div>
        {/* <Outlet/> */}
      </div>
      <br />
      <Outlet />
    </>
  );
};

export default Layout;
