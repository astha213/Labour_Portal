import React, { useState } from 'react';
import './Update.css'; // Include your custom styles for this page

const Update = () => {
  const [name, setName] = useState(''); // State for name
  const [email, setEmail] = useState(''); // State for email
  const [phone, setPhone] = useState(''); // State for phone
  const [jobTitle, setJobTitle] = useState(''); // State for job title
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Logic to handle deletion based on the provided details
    // For example, you could make an API call here to delete a user/job based on the inputs
    alert(`User with email "${email}" and job title "${jobTitle}" will be deleted.`);
  };

  return (
    <div className="containerup">
      <div className="headerup">
        <div className="textup">Update</div>
        <div className="underlineup"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="inputsup">
          
          <div className="inputup">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="inputup">
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

       
          <div className="inputup">
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

         
          <div className="inputup">
            <label>Job Title:</label>
            <select
              name="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            >
              <option value="" disabled>Select a job title</option>
              <option value="Plumber">Plumber</option>
              <option value="Electrician">Electrician</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Mechanic">Mechanic</option>
              <option value="Labourer">Labourer</option>
            </select>
          </div>

          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>

        <div className="submit-container1">
          <button type="submit" className="submit1">
          Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
