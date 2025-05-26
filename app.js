const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./mongo'); // Import the User model
const ServiceRequest = require('./req');
require('dotenv').config();      // Load environment variables

const app = express();



// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

// Default route (you can add a response here)
app.get("/", (req, res) => {
    res.send("API is running");
});
  
// Fetch a user by email
app.get("/user", async (req, res) => {
    const { email, jobTitles } = req.query;

    try {
        if (email) {
            const user = await User.findOne({ email });
            if (user) {
                return res.status(200).json({
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    age: user.age,
                    gender: user.gender,
                    aadhar: user.aadhar,
                    userType: user.userType,
                    jobTitles: user.jobTitles,
                    availability: user.availability,
                    rating: user.rating
                });
            } else {
                return res.status(404).json({ message: "User not found with the provided email." });
            }
        } else if (jobTitles) {
            const labourers = await User.find({
                jobTitles: { $in: jobTitles.split(',') },
                availability: 'Available'
            });
            return res.status(200).json(labourers.length ? labourers : { message: "No labourers found for the provided job titles." });
        } else {
            return res.status(400).json({ message: "Either email or jobTitles query parameter is required." });
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});


app.get('/service', async (req, res) => {
    const { labourerEmail } = req.query;

    
    try {
        const requests = await ServiceRequest.find({ labourerEmail });
        if (requests.length === 0) {
            return res.status(404).json({ message: 'No service requests found for this user.' });
        }
        res.status(200).json(requests);
    } catch (error) {
        console.error("Error fetching service requests:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


// Handle login
app.post("/login", async (req, res) => {
    const { email, password, userType } = req.body;

    try {
        const user = await User.findOne({ email, userType });
        if (!user) {
            return res.status(401).json("notexist");
        }

        // Compare the entered password with the hashed password stored in the database
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json("Invalid password");
        }

        // Avoid logging sensitive data like passwords
        console.log(`Login successful for user: ${email}`);

        // Return user data if the password matches
        return res.status(200).json({
            message: "exist",
            user: { email: user.email, name: user.name, userType: user.userType },
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json("An error occurred during login.");
    }
});

app.post('/setRating', async (req, res) => {
    const { email, rating } = req.body; // Destructure the email and rating from the request body

    console.log("Request received:", { email, rating });

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        user.rating = rating;  // Update the rating
        await user.save();  // Save the updated user

        res.status(200).json({ message: "Rating updated successfully." });
    } catch (error) {
        console.error('Error updating rating:', error);
        res.status(500).json({ message: "Failed to update rating." });
    }
});


const nodemailer = require('nodemailer');

// Set up email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'xyz@gmail.com', //sender address
        pass: 'xxxx xxxx xxxx xxxx',  //pass key
    }
});

// Function to send email to the customer
function sendServiceRequestEmail(customerEmail, labourerEmail, selectedJob) {
    const mailOptions = {
        from: 'xyz@gmail.com', // Sender address
        to: customerEmail,            // Customer's email
        subject: 'Service Request Confirmation',
        text: `Dear Customer, \n\nYour service request for a ${selectedJob} has been successfully made. The labourer (${labourerEmail}) will contact you shortly.\n\nThank you for using our service.\n\nBest regards,\nLabourHub`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}



const crypto = require('crypto');

// Modify the forget password route
app.post('/forgetp', async (req, res) => {
    const { email } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

      
        // Set up Nodemailer and send the email
        const resetLink = `http://localhost:3001/reset-password`; // Adjust the link as per your front-end route
        const mailOptions = {
            from: 'xyz@gmail.com', // Sender address
            to: email, // Recipient's email
            subject: 'Password Reset Request',
            text: `Dear Customer, \n\nYou requested a password reset. \nPlease click the link below to update your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.\n\nThank you for using our service.\n\nBest regards,\nLabourHub` // Add actual reset link
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email sent to reset password' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

      
        user.password = newPassword; 

        await user.save();

        const mailOptions = {
            from: 'xyz@gmail.com',   // Sender's email
            to: email,                      // Receiver's email
            subject: 'Password Reset Confirmation',
            text: `Dear Customer, \n\nYour password has been successfully updated.\n\nIf you did not request this, please ignore this email.\n\nThank you for using our service.\n\nBest regards,\nLabourHub`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Password has been successfully reset.' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

app.delete('/custrequests/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ServiceRequest.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send('Request not found');
        }
        res.status(200).send('Request deleted successfully');
    } catch (error) {
        console.error('Error deleting request:', error); // Log error for debugging
        res.status(500).send('Error deleting request'); // Return error to client
    }
});



app.delete('/requestService/:id', async (req, res) => {
    const { id } = req.params; 

    // Check if ID is provided and is a valid ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid Request ID');
    }

    try {
        const result = await ServiceRequest.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send('Request not found');
        }

        res.status(204).send(); // No content on successful deletion
    } catch (error) {
        console.error('Error declining service request:', error);
        res.status(500).json({ message: 'Error declining service request.' });
    }
});

const twilio = require('twilio');



// Modify the /requestService route to send an email
app.post('/requestService', async (req, res) => {
    const { customerEmail, labourerEmail, selectedjob } = req.body;

    if (!customerEmail || !labourerEmail) {
        return res.status(400).json({ message: 'Both customer and labourer emails are required.' });
    }

    try {
        // Save the service request to the database
        const newRequest = new ServiceRequest({
            customerEmail,
            labourerEmail,
            selectedjob,
            status: true,
        });

        await newRequest.save();

        sendServiceRequestEmail(customerEmail, labourerEmail, selectedjob);

        res.status(200).json({ message: 'Service requested successfully!' });
    } catch (error) {
        console.error('Error processing service request:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


// Update availability route
app.post('/setAvailability', async (req, res) => {
    const { email, availability } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.availability = availability; // Update the availability field
        await user.save(); // Save the updated user document

        res.status(200).json({ message: 'Availability updated successfully', user });
    } catch (error) {
        console.error('Error updating availability:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Handle signup
app.post("/signup", async (req, res) => {
    const { name, email, password, userType, phone, age, gender, aadhar, jobTitles } = req.body;

    if (!email || !password || !userType) {
        return res.status(400).json({ message: "Email, password, and user type are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const newUser = new User({
            name,
            email,
            password, 
            userType,
            phone,
            age,
            gender,
            aadhar,
            jobTitles,
            rating: 0, 
            availability: "Available" // default status
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error during signup" });
    }
});


// Fetch user data for the add job page
app.get('/addjob', async (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { name, email: userEmail, phone, age, gender, aadhar } = userData;
        res.json({ name, email: userEmail, phone, age, gender, aadhar });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Submit the job title for a user
app.post('/addJob', async (req, res) => {
    const { email, jobTitle } = req.body;

    try {
        if (!email || !jobTitle) {
            return res.status(400).json({ error: 'Email and Job Title are required.' });
        }

        // Find the user by email and add the new job title to the jobTitles array
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Add the job title to the user's jobTitles array
        user.jobTitles.push(jobTitle);
        await user.save(); // Save the updated user document

        return res.status(201).json({ message: 'Job added successfully!', jobTitles: user.jobTitles });
    } catch (error) {
        console.error('Error adding job:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

// Add this endpoint to fetch service requests for a specific customer
app.get('/custrequests', async (req, res) => {
    const { customerEmail, selectedjob } = req.query;

    if (!customerEmail) {
        return res.status(400).json({ message: 'Customer email is required.' });
    }

    try {
        // Find all service requests for the specified customer
        const requests = await ServiceRequest.find({ customerEmail });
        
        if (requests.length === 0) {
            return res.status(404).json({ message: 'No service requests found for this customer.' });
        }
        
        res.status(200).json(requests);
    } catch (error) {
        console.error("Error fetching service requests:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


// Start the server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
