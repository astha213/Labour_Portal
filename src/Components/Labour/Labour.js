import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import './Labour.css'; 
import user_icon from '../Assests/user2.png';

const Labour = () => {
    const [user, setUser] = useState(null);
    const [serviceRequests, setServiceRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false); 
    const [loadingServiceRequest, setLoadingServiceRequest] = useState(false); 
    const [availability, setAvailability] = useState(""); 

    const toggleDropdown = (event) => {
        event.stopPropagation();
        setDropdownOpen(prevState => !prevState);
    };

    const handleClickOutside = () => {
        if (dropdownOpen) setDropdownOpen(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dropdownOpen]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('User'));
        if (user && user.email) {
            axios.get(`http://localhost:3000/user?email=${user.email}`)
                .then(response => {
                    if (response.data) {
                        setUser(response.data);
                    } else {
                        setErrorMessage("No user data available.");
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    setErrorMessage("Error fetching user data.");
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const handleFetchServiceRequests = async () => {
        if (user && user.email) {
            setLoadingServiceRequest(true); 
            try {
                const response = await axios.get(`http://localhost:3000/service?labourerEmail=${user.email}`);
                if (response.data && response.data.length > 0) {
                    setServiceRequests(response.data); 
                } else {
                    setErrorMessage("No service requests found.");
                }
            } catch (error) {
                console.error('Error fetching service requests:', error);
                setErrorMessage("Error fetching service requests.");
            } finally {
                setLoadingServiceRequest(false); 
            }
        } else {
            setErrorMessage("User email not found.");
        }
    };

    

    const handleAvailabilityChange = async () => {
        if (!availability) {
            setErrorMessage("Please select an availability status.");
            return; 
        }
        
        if (user && user.email) {
            try {
                const response = await axios.post(`http://localhost:3000/setAvailability`, {
                    email: user.email,
                    availability: availability
                });
                
                if (response.status === 200) {
                    setErrorMessage("Availability updated successfully.");
                } else {
                    setErrorMessage(`Failed to update availability. Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error updating availability:', error);
                if (error.response) {
                    setErrorMessage(`Error: ${error.response.data.message || 'Failed to update availability.'}`);
                } else if (error.request) {
                    setErrorMessage("Error: No response from server.");
                } else {
                    setErrorMessage(`Error: ${error.message}`);
                }
            }
        } else {
            setErrorMessage("User email not found.");
        }
    };
    

    if (loading) {
        return <div>Loading user data...</div>;
    }

    if (errorMessage) {
        return <div>{errorMessage}</div>;
    }

    if (!user) {
        return <div>No user data available.</div>;
    }

    return (
        <div className="labourcon">
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
                                <Link to="/login" onClick={() => setDropdownOpen(false)}>Login</Link>
                                <Link to="/" onClick={() => setDropdownOpen(false)}>Log Out</Link>
                            </div>
                        )}
                    </li>
                </ul>
            </nav>

            <div className="divtable">
                <h2>Logged-in User Information</h2>
                <table className="table">
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{user.name || "N/A"}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{user.email || "N/A"}</td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>{user.phone || "N/A"}</td>
                        </tr>
                        <tr>
                            <td>Age</td>
                            <td>{user.age || "N/A"}</td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>{user.gender || "N/A"}</td>
                        </tr>
                        <tr>
                            <td>Aadhar</td>
                            <td>{user.aadhar || "N/A"}</td>
                        </tr>
                        <tr>
                            <td>Job Title</td>
                            <td>{user.jobTitles ? user.jobTitles.join(', ') : "N/A"}</td>
                        </tr>
                        <tr>
                        <td>Rating</td>
                                        <td>{user.rating || "No rating available"}</td>
                                        </tr>
                         
                    </tbody>
                </table>

                <button onClick={handleFetchServiceRequests} disabled={loadingServiceRequest}>
                    {loadingServiceRequest ? 'Fetching...' : 'Fetch Service Requests'}
                </button>
            </div>

            {/* Service Requests Details */}
            {serviceRequests.length > 0 && (
                <div className="divtables">
                    <h3>Service Requests Details</h3>
                    {serviceRequests.map((request, index) => (
                        <div key={index} className="request-table">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>Customer Email</td>
                                        <td>{request.customerEmail || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td>Labourer Email</td>
                                        <td>{request.labourerEmail || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td>Job Title</td>
                                        <td>{request.selectedjob || "N/A"}</td>
                                    </tr>

                                    
                                       

                                    <tr>
   
</tr>

                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            )}

            {/* Availability Section */}
            <div className="availability-section">
                <h3>Set Availability</h3>
                <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
                    <option value="">Select Availability</option>
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                </select>
                <button onClick={handleAvailabilityChange}>Set Availability</button>
            </div>
        </div>
    );
};

export default Labour;
