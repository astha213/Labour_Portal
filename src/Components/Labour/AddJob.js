import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"; 
import './AddJob.css'; 

import user_icon from '../Assests/user2.png';
import labour_icon from '../Assests/labour.png';

const AddJob = () => {
    const [email, setEmail] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [message, setMessage] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false); 

    const toggleDropdown = (event) => {
        event.stopPropagation();
        setDropdownOpen(prevState => !prevState);
    };

    const handleClickOutside = () => {
        if (dropdownOpen) setDropdownOpen(false);
    };
    

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make the POST request to add the job
            const response = await axios.post('http://localhost:3000/addJob', { email, jobTitle });
            
            if (response.status === 201) {
                setMessage('Job added successfully!');
            } else {
                setMessage('Failed to add job');
            }
        } catch (error) {
            console.error('Error adding job:', error);
            setMessage('An error occurred while adding the job.');
        }
    };

    return (

        <div className="containerjob">
            <nav className="navbar">
                <h1>LabourHub</h1>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/add-job">Add Job</a></li>
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
                                <Link to="/signup" onClick={() => setDropdownOpen(false)}>SignUp</Link>
                                <Link to="/login" onClick={() => setDropdownOpen(false)}>Login</Link>
                            </div>
                        )}
                    </li>
                </ul>
            </nav>

            <div className="containeradd">

            <h2>Add Job</h2>
            <form onSubmit={handleSubmit}>
            <div className="inputadd">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="inputadd">
                    <label>Job Title:</label>
                    <select
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        required
                    >
                        <option value="">Select Job Title</option>
                        <option value="Plumber">Plumber</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Carpenter">Carpenter</option>
                    </select>
                </div>
                <div className="submit-container1">
                        <button type="submit" className="submit1">Add Job</button>
                    </div>
            </form>
            {message && <p>{message}</p>}

        </div>
        </div>
        
    );
};

export default AddJob;
