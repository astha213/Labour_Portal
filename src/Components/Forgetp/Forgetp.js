import React, { useState } from 'react';
import './Forgetp.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import email_icon from '../Assests/email.png'; // Import your email icon

const Forgetp = () => {
    const [email, setEmail] = useState(''); // State for email
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        setSuccessMessage(''); // Clear previous success messages

        try {
            // Send a POST request to the backend to send email
            const response = await axios.post('http://localhost:3000/forgetp', { email });
            console.log('Success:', response.data);

            // Set a success message upon successful email sending
            setSuccessMessage("An email has been sent with instructions to reset your password.");
        } catch (error) {
            // Handle errors and update the error message
            if (error.response) {
                setError(error.response.data.message || 'An error occurred');
                console.error('Error:', error.response.data);
            } else {
                setError('An error occurred');
                console.error('Error:', error.message);
            }
        }
    };

    const handleBackClick = () => {
        navigate('/login'); // Navigate to the login page
    };


    return (
        <div className="containerforgot">             
            <div className='containerf'>
                <div className="headerf">
                    <div className="textf">Forget Password</div>
                    <div className="underlinef"></div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="inputs1f">
                        <div className="input1f">
                            <img src={email_icon} alt="Email Icon" style={{ width: '30px', height: '30px' }} />
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>

                    <div className="submit-containerf">
                        <button type="submit" className="submitf">
                            Next
                        </button>

                        <button type="button" className="submitf" onClick={handleBackClick}>
                            Back
                        </button>
                    </div>

                    {/* Display success message or error message */}
                    {successMessage && <p className="success">{successMessage}</p>}
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>  
    );
};

export default Forgetp;
