// mongo.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Connect to MongoDB
mongoose.connect(/*add mongo link */"", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch(err => {
    console.error("MongoDB connection error:", err);
});

// User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    aadhar: { type: String, required: true, unique: true },
    userType: { type: String, enum: ['labour', 'customer'], required: true },
    jobTitles: { type: [String] },
    availability: { type: String, enum: ['Available', 'Not Available'], default: 'Not Available' },
    rating: { type: Number}, 
});

// Pre-save hook to hash password
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model('User', userSchema);
module.exports = User;



// Utility function to fetch user by email
const getUserByEmail = async (email) => {
    return await User.findOne({ email }); 
};

const updateAvailabilityField = async () => {
    try {
        await User.updateMany({}, { $set: { availability: 'Not Available' } }); // Set default availability for existing users
        console.log("Availability field updated for existing users.");
    } catch (err) {
        console.error("Error updating availability field:", err);
    } 
    finally {
        mongoose.connection.close(); // Close connection after updating
    }
};

const updateRatingField = async () => {
    try {
        await User.updateMany({}, { $set: { rating: 0 } }); // Set default availability for existing users
        console.log("Rating updated for existing users.");
    } catch (err) {
        console.error("Error updating Rating field:", err);
    } finally {
        mongoose.connection.close(); // Close connection after updating
    }
};

