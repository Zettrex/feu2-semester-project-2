import React from "react";
import PropTypes from "prop-types";

export default function StarRating({score}) {
    let rating = parseFloat(score);
    const stars = []
    for (let i = 0; i < 5; i++) {
        if (rating >= 1) {
            rating -= 1;
            stars.push(<i key={i} className="fas fa-star"/>)
        } else if (rating === 0.5) {
            rating -= 0.5;
            stars.push(<i key={i} className="fas fa-star-half-alt"/>)
        }  else {
            stars.push(<i key={i} className="far fa-star"/>)
        }
    }
    return stars;
}

StarRating.propTypes = {
    score: PropTypes.string //removed isRequired due to map not parsing in the rating always as it loads infoWindow
    // before it displays it
}