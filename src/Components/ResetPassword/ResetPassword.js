import React, { useState } from 'react';
import './ResetPassword.css';
import axios from "axios";
import email_icon from '../Assests/email.png';
import password_icon from '../Assests/password.png';

const ResetPassword = () => {
    const [email, setEmail] = useState(''); // State for email
    const [newPassword, setNewPassword] = useState(''); // State for new password
    const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        setSuccessMessage(''); // Clear previous success messages
    
        // Check if new password and confirm password match
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
    
        try {
            // Send a POST request to the backend to update the password
            const response = await axios.post('http://localhost:3000/reset-password', { email, newPassword });
            console.log('Success:', response.data);
    
            // Set a success message upon successful password update
            setSuccessMessage("Your password has been successfully updated.");
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
    

    return (
        <div className="containerforgot">             
            <div className='containerf'>
                <div className="headerf">
                    <div className="textf">Reset Password</div>
                    <div className="underlinef"></div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="inputs1f">
                    <div className="input1f">
                    <img src={email_icon} alt="Email Icon" style={{ width: '30px', height: '30px' }} />
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="input1f">
                        <img src={password_icon} alt="Password Icon" style={{ width: '30px', height: '30px' }} />
                            
                            <input 
                                type="password" 
                                name="newPassword" 
                                placeholder="New Password" 
                                value={newPassword} 
                                onChange={(e) => setNewPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="input1f">
                        <img src={password_icon} alt="Password Icon" style={{ width: '30px', height: '30px' }} />
                            
                            <input 
                                type="password" 
                                name="confirmPassword" 
                                placeholder="Confirm New Password" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>

                    <div className="submit-containerf">
                        <button type="submit" className="submitf">
                            Reset Password
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

export default ResetPassword;
