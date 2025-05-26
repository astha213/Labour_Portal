import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Request.css'; // CSS for styling
import { useNavigate } from 'react-router-dom';

const Request = () => {
    const [requests, setRequests] = useState([]); // State to hold requests
    const [error, setError] = useState(''); // State for error messages
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const jobTitles = localStorage.getItem('selectedJobTitle');

        if (!jobTitles) {
            setError('No job title found in local storage.');
            setLoading(false);
            return;
        }

        const fetchRequests = async () => {
            try {
                const user = localStorage.getItem('User'); // Retrieve email from local storage
                const customerEmail = JSON.parse(user)?.email; // Parse the stored JSON to get email
                const selectedjob = localStorage.getItem('selectedJobTitle');

                // Use GET method with query parameters
                const response = await axios.get(`http://localhost:3000/custrequests?customerEmail=${customerEmail}&selectedjob=${selectedjob}`);
                
                setRequests(response.data); // Update the state with the fetched requests
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching service:', error);
                setError('Failed to fetch request. Please try again.'); // Update the error state
                setLoading(false); // Set loading to false even on error
            }
        };
        
        fetchRequests();
    }, []);

    const handleDelete = async (requestId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/custrequests/${requestId}`);
            console.log('Delete response:', response); // Optional: log the response
            // Update requests state to remove the deleted request
            setRequests((prevRequests) => prevRequests.filter((request) => request._id !== requestId));
        } catch (error) {
            console.error('Error deleting request:', error);
            setError('Failed to delete request. Please try again.'); // Update error state
        }
    };

    return (
        <div className="containerreq">
            <button className="back-button" onClick={() => navigate('/customer')}>Back</button>
            <div className="request-list-container">
                <h1>Customer Requests</h1>
                {error && <p className="error">{error}</p>}
                {loading ? ( // Show loading message while fetching data
                    <p>Loading requests...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Customer Email</th>
                                <th>Service</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.length > 0 ? (
                                requests.map((request) => (
                                    <tr key={request._id}>
                                        <td>{request.customerEmail}</td>
                                        <td>{request.selectedjob}</td>
                                        <td>{new Date(request.createdAt).toLocaleString()}</td>
                                        <td>
                                            <button 
                                                className="delete-button" 
                                                onClick={() => handleDelete(request._id)} // Call delete handler with request ID
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No requests found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Request;
