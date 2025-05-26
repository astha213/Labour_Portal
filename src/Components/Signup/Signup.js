import { useState } from 'react';
import './Signup.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import user_icon from '../Assests/user.png';
import email_icon from '../Assests/email.png';
import password_icon from '../Assests/password.png';
import phoneno_icon from '../Assests/phone2.png';
import age_icon from '../Assests/age.jpg';
import gender_icon from '../Assests/gender.png';
import aadhar_icon from '../Assests/aadhar.png';

const Signup = () => {
    const navigate = useNavigate();

    const initialData = {
        name: "",
        email: "",
        password: "",
        phone: "",
        age: "",
        gender: "",
        aadhar: "",
        userType: ""
    };
    
    const [inputData, setInputData] = useState(initialData);
    const [errorMessage, setErrorMessage] = useState('');

    const handleData = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const isPasswordStrong = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{10,}$/;
        return regex.test(password);
    };

    const isPhoneValid = (phone) => {
        const regex = /^\d{10}$/;
        return regex.test(phone);
    };

    const isEmailValid = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const isAgeValid = (age) => {
        const regex = /^\d+$/; 
        return regex.test(age) && age > 0 && age < 70; 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!isPasswordStrong(inputData.password)) {
            setErrorMessage("Password must contain at least 10 characters, including one uppercase letter, one number, and one special character.");
            return;
        }

        if (!isPhoneValid(inputData.phone)) {
            setErrorMessage("Phone number must be exactly 10 digits.");
            return;
        }

        if (!isEmailValid(inputData.email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        if (!isAgeValid(inputData.age)) {
            setErrorMessage("Please enter a valid age.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/signup", inputData);
            if (response.data === "exist") {
                setErrorMessage("User already exists");
            } else {
                alert("Signup Successful");
                navigate("/login");
            }
        } catch (e) {
            setErrorMessage("An error occurred during signup. Please try again.");
        }
    };

    return (
        <div className="containersignup">
            <div className="container1">
                <div className="header1">
                    <div className="text1">Signup</div>
                    <div className="underline1"></div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="inputs1">
                        <div className="input1">
                            <img src={user_icon} alt="User Icon" style={{ width: '30px', height: '30px' }} />
                            <input 
                                type="text" 
                                placeholder="Name" 
                                name="name" 
                                value={inputData.name} 
                                onChange={handleData} 
                                autoComplete="name" 
                                required 
                            />
                        </div>

                        <div className="input1">
                            <img src={phoneno_icon} alt="Phone Icon" style={{ width: '30px', height: '30px' }} />
                            <input 
                                type="text" 
                                placeholder="Phone Number" 
                                name="phone" 
                                value={inputData.phone} 
                                onChange={handleData} 
                                autoComplete="tel" 
                                required 
                            />
                        </div>

                        <div className="input1">
                            <img src={age_icon} alt="Age Icon" style={{ width: '30px', height: '30px' }} />
                            <input 
                                type="number" 
                                placeholder="Age" 
                                name="age" 
                                value={inputData.age} 
                                onChange={handleData} 
                                autoComplete="age" 
                                required 
                            />
                        </div>

                        <div className="input1">
                            <img src={gender_icon} alt="Gender Icon" style={{ width: '30px', height: '35px' }} />
                            <select 
                                id="gender" 
                                name="gender" 
                                value={inputData.gender} 
                                onChange={handleData} 
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="input1">
                            <img src={aadhar_icon} alt="Aadhar Icon" style={{ width: '30px', height: '40px' }} />
                            <input 
                                type="text" 
                                placeholder="Aadhar ID" 
                                name="aadhar" 
                                value={inputData.aadhar} 
                                onChange={handleData} 
                                autoComplete="off" 
                                required 
                            />
                        </div>

                        <div className="input1">
                            <img src={email_icon} alt="Email Icon" style={{ width: '30px', height: '30px' }} />
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email Id" 
                                value={inputData.email} 
                                onChange={handleData} 
                                autoComplete="email" 
                                required 
                            />
                        </div>

                        <div className="input1">
                            <img src={password_icon} alt="Password Icon" style={{ width: '30px', height: '30px' }} />
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                value={inputData.password} 
                                onChange={handleData} 
                                autoComplete="new-password" 
                                required 
                            />
                        </div>

                        <div className="user-type">
                            <label>
                                <input type="radio" name="userType" value="labour" onChange={handleData} />
                                Labour
                            </label>
                            <label>
                                <input type="radio" name="userType" value="customer" onChange={handleData} />
                                Customer
                            </label>
                        </div>

                        {errorMessage && <p className="error">{errorMessage}</p>}
                    </div>

                    <div className="account1">
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                    <div className="submit-container1">
                        <button type="submit" className="submit1">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
