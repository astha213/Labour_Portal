import React, { useState } from 'react';
import './Delete.css'; // Include your custom styles for this page

const Delete = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [email, setEmail] = useState(''); // New state for email
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="containerdel">
      <div className="headerdel">
        <div className="textdel"> Delete</div>
        <div className="underlinedel"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="inputsdel">
         
          <div className="inputdel">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

         

          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>

        <div className="submit-container1">
          <button type="submit" className="submit1">
          Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default Delete;
