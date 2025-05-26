import React, { useState, useEffect } from 'react';
import './StarRating.css'; // Optional: Add styles if you have them

const StarRating = ({ rating = 0, onSubmit, closeFeedback }) => {
    const [currentRating, setCurrentRating] = useState(rating);

    useEffect(() => {
        // Sync currentRating with the passed rating prop
        setCurrentRating(rating);
    }, [rating]);

    const handleRatingClick = (value) => {
        setCurrentRating(value);  // Update the current rating when a star is clicked
    };

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(currentRating);  // Submit the updated rating to the parent component
        }
    };

    return (
        <div className="star-rating">
            <h4>Rate this Labourer</h4>
            <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={star <= currentRating ? 'star filled' : 'star'}
                        onClick={() => handleRatingClick(star)}
                    >
                        ★
                    </span>
                ))}
            </div>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={closeFeedback}>Close</button>
        </div>
    );
};

export default StarRating;
