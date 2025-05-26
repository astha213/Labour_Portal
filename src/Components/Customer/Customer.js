import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Customer.css'; // Include your combined CSS file here

import user_icon from '../Assests/user2.png';
import plumber_img from '../Assests/plumber.png';
import carpenter_img from '../Assests/carpenter.png';
import electrician_img from '../Assests/electrician.png';
import weldor_img from '../Assests/weldor.png';

const Customer = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
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

  // Function to navigate to Labourer page with the jobTitle
  const handleCardClick = (jobTitle) => {
    // Store the jobTitle in local storage
    localStorage.setItem('selectedJobTitle', jobTitle); 
    navigate(`/labourers/${jobTitle}`); // Navigate to the labourer page with jobTitle
  };

  useEffect(() => {
    const email = localStorage.getItem('User');
    if (email) {
      const userData = JSON.parse(email); // Parse the stored data if it's in JSON format
      setUserEmail(userData.email); // Assuming email is stored as { email: "user@example.com" }
    }
  }, []);
  
  return (
    <div className="containercus">
      <div className="cust">
        <nav className="navbarcus">
          <h1>LabourHub</h1>
          <ul>
            <li><a href="#welcome">Home</a></li>
            <li><a href="/request">Requests</a></li>
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
                <div className="dropdown-menu">
                  <Link to="/login" onClick={() => setDropdownOpen(false)}>Login</Link>
                  <Link to="/" onClick={() => setDropdownOpen(false)}>Log Out</Link>
                </div>
              )}
            </li>
          </ul>
        </nav>

        <div className="row mt-4">
          <div className="card-container d-flex flex-wrap justify-content-around">
            <div className="col-md-3 ">
              <div className="card" onClick={() => handleCardClick('Electrician')}>
                <img src={electrician_img} alt="Electrician" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">Electrician</h5>
                  <p className="card-text">Get reliable electrical services at your doorstep.</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card" onClick={() => handleCardClick('Carpenter')}>
                <img src={weldor_img} alt="Carpenter" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">Carpenter</h5>
                  <p className="card-text">Expert metal joining and fabrication services.</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card" onClick={() => handleCardClick('Plumber')}>
                <img src={plumber_img} alt="Plumber" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">Plumber</h5>
                  <p className="card-text">Expert plumbing services for all your needs.</p>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
