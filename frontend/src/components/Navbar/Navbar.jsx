import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { toast, ToastContainer } from 'react-toastify';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const userString = localStorage.getItem('user');
      const userObj = JSON.parse(userString);
      setUser(userObj);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    toast.success('Logged out successfully!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setTimeout(() => window.location.href = '/', 2000);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="nav-header">
      <ToastContainer />
      <nav className="nav-container">
        <div className="logo-container">
          <h1 className="logo logo-text text-3xl font-bold tracking-wide" style={{ color: 'white' }}>
            Moodify
          </h1>
        </div>

        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li>
              <Link className="nav-link" to="/">
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/recommendation">
                <span>Music Recommendation</span>
                <ion-icon name="star" className="featured-icon"></ion-icon>
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/community">
                <span>Community</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/feedback">
                <span>Feedback</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/contact-us">
                <span>Contact Us</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="relative">
              <button
                className="dropdown-toggle flex items-center space-x-2 px-4 py-2 rounded-md bg-gray-100 text-gray-700"
                onClick={toggleMenu}
              >
                <span className="sr-only">Open dropdown menu</span>
                <UserIcon className="w-6 h-6 text-gray-700" />
                <span className="hidden sm:block">
                  Hi, {user?.first_name || 'Sample'} {user?.last_name || 'Customer'}
                </span>
              </button>
              <div
                className={`dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ${
                  isMenuOpen ? '' : 'hidden'
                }`}
              >
                <Link
                  to="/dashboard"
                  className="dropdown-item block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/"
                  className="dropdown-item block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  onClick={logout}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <Link
              to="/login-register"
              className="login-button px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              Login/Signup
            </Link>
          )}
          <Bars3Icon
            onClick={toggleMenu}
            className={`menu-toggle w-6 h-6 text-gray-700 hover:text-gray-900 ${isMenuOpen ? 'hidden' : ''}`}
          />
          <XMarkIcon
            onClick={toggleMenu}
            className={`menu-toggle w-6 h-6 text-gray-700 hover:text-gray-900 ${isMenuOpen ? '' : 'hidden'}`}
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;