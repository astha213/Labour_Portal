import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

import user_icon from '../Assests/user2.png';
import labour_icon from '../Assests/labour.png';

const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false); 

  // Function to toggle dropdown visibility
  const toggleDropdown = (event) => {
    event.stopPropagation(); 
    setDropdownOpen(prevState => !prevState);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.user-menu') === null) {
        setDropdownOpen(false); 
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="containerhome">
    <div className="home">
      <nav className="navbar">
        <h1>LabourHub</h1>
        <ul>
          <li><a href="#welcome">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#about">About</a></li>
          <li className="user-menu">
            <img 
              src={user_icon}
              alt="User" 
              className="user-icon" 
              width="35px" 
              height="30px"
              onClick={toggleDropdown} 
            />
            {dropdownOpen && (
              <div className="dropdown-menu open"> 
                <Link to="/signup" onClick={() => setDropdownOpen(false)}>Sign Up</Link>
                <Link to="/login" onClick={() => setDropdownOpen(false)}>Login</Link>
              </div>
            )}
          </li>
        </ul>
      </nav>

      <div className="welcome-container">
        <section id="welcome" className="welcome">
          <h2>Welcome to Labour Portal</h2>
          <p>Your all-in-one platform for connecting with trusted electricians, plumbers, and carpenters and many more. Get reliable service at your convenience, all in one place.</p>
        </section>
      </div>
{/* 
      <div>
        <img src={labour_icon} width="500px" height="500px" alt="Welcome" className="welcome-image" />
      </div> */}

    </div>
    </div>
  );
};

export default Home;
