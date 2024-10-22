// src/components/Button.jsx
import React from "react";
import styles from "./Button.module.css"; // Import CSS styles

const Button = ({ onClick, children, type = "button", variant = "primary", className }) => {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${className}`} // Combine default and variant styles
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;
