const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Connect to MongoDB
mongoose.connect("mongo link", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch(err => {
    console.error("MongoDB connection error:", err);
});


const serviceRequestSchema = new mongoose.Schema({
    customerEmail: {
        type: String,
        required: true,
    },
    labourerEmail: {
        type: String,
        required: true,
    },
    selectedjob: {
        type: String,
    },
    status: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);
module.exports = ServiceRequest;


