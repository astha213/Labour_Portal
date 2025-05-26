import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Labourers.css'; 
import { Link } from "react-router-dom"; 
import user_icon from '../Assests/user2.png';
import labour_icon from '../Assests/labour.png';
import StarRating from '../StarRating/StarRating';

const Labourers = () => {
    const [user, setUser] = useState(null);
    const [labourers, setLabourers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false); 
    const [feedbackOpen, setFeedbackOpen] = useState(null);
    const [rating, setRating] = useState(null);

    const toggleDropdown = (event) => {
        event.stopPropagation();
        setDropdownOpen(prevState => !prevState);
    };

    const handleClickOutside = () => {
        if (dropdownOpen) setDropdownOpen(false);
    };


    useEffect(() => {
        // Fetch the job title from local storage
        const jobTitles = localStorage.getItem('selectedJobTitle');
       


        // If no job titles found, exit early
        if (!jobTitles) {
            setError('No job title found in local storage.');
            setLoading(false);
            return;
        }

        // Fetch labourers based on job title
        const fetchLabourers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/user', {
                    params: { jobTitles ,availability: 'Available'}
                });
                setLabourers(response.data);
            } catch (error) {
                setError('Error fetching labourers.');
                console.error('Error fetching labourers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLabourers();
    }, []);
    

    const requestService = async (labourerEmail) => {
        try {
            const user = JSON.parse(localStorage.getItem('User'));
            const customerEmail = user?.email;
            const selectedjob = localStorage.getItem('selectedJobTitle');

    
            const response = await axios.post('http://localhost:3000/requestService', {
                customerEmail,
                labourerEmail, 
                status : true,
                selectedjob,
            });

    
            alert(response.data.message); 

            

        } catch (error) {
            console.error('Error requesting service:', error);
            alert('Failed to request service. Please try again.');
        }
    };
    
    const handleFeedbackClick = (labourerId) => {
        setFeedbackOpen(prev => (prev === labourerId ? null : labourerId));
    };

    const handleSubmit = async () => {
    
        const user = JSON.parse(localStorage.getItem('User'));
        if (user && user.email) {
            try {
                const response = await axios.post('http://localhost:3000/setRating', {
                    email: user.email,
                    rating: user.rating,
                });
                alert(response.data.message); // Show success message from backend
            } catch (error) {
                console.error('Error submitting rating:', error);
                alert('There was an error submitting the rating.');
            }
        } else {
            setError("User email not found.");
            alert("User is not logged in or email not found in local storage.");
        }
    };
    
    

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="containerlab">
        <nav className="navbar">
                <h1>LabourHub</h1>
                <ul>
                    <li><a href="/">Home</a></li>
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
                            <div className="dropdown-menu open">
                                <Link to="/login" onClick={() => setDropdownOpen(false)}>Login</Link>
                                <Link to="/" onClick={() => setDropdownOpen(false)}>Log Out</Link>
                            </div>
                        )}
                    </li>
                </ul>
            </nav>
        <div className="labourers-container">
            <h2>Available Labourers</h2>
            {labourers.length === 0 ? (
                <p>No labourers found for the selected job title.</p>
            ) : (
                labourers.map((labourer) => (
                    <div key={labourer._id} className="labourer-card">
                        <h3>{labourer.name}</h3>
                        <p><strong>Email:</strong> {labourer.email}</p>
                        <p><strong>Phone:</strong> {labourer.phone}</p>
                        <p><strong>Job Titles:</strong> {labourer.jobTitles.join(', ')}</p>
                        <p><strong>Gender:</strong> {labourer.gender}</p>
                        <p><strong>Age:</strong> {labourer.age}</p>
                        <p><strong>Aadhar:</strong> {labourer.aadhar}</p>
                        <p><strong>Rating:</strong> {labourer.rating}</p>
                        <button onClick={() => requestService(labourer.email)}>Request Service</button>

                        <button onClick={() => handleFeedbackClick(labourer._id)}>Feedback</button>

                            {feedbackOpen === labourer._id && (
                                <StarRating onSubmit={handleSubmit} closeFeedback={() => setFeedbackOpen(null)} />
                            )}
                    </div>
                ))
            )}
        </div>
        </div>
    );
};

export default Labourers;
