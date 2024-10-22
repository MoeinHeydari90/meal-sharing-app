// src/components/StarRating.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const StarRating = ({ value, onChange, readOnly = false }) => {
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} onClick={!readOnly ? () => onChange(i) : null}>
                    {value >= i ? (
                        <FontAwesomeIcon icon={solidStar} style={{ color: "#00c194" }} />
                    ) : (
                        <FontAwesomeIcon icon={regularStar} style={{ color: "#00c194" }} />
                    )}
                </span>
            );
        }
        return stars;
    };

    return <div>{renderStars()}</div>;
};

export default StarRating;
