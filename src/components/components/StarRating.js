import React from "react";

export default function ({rating:score}) {
    let rating = parseFloat(score);
    const stars = []
    for (let i = 0; i < 5; i++) {
        console.log(score, rating)
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