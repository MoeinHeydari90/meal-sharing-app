// src/components/InputField.jsx
import React from "react";
import styles from "./InputField.module.css"; // Ensure correct path for styles

const InputField = ({ type, value, onChange, placeholder, required, className, rows }) => {
    // Function to render the appropriate input type
    const renderInput = () => {
        if (type === "textarea") {
            return (
                <textarea
                    className={`${styles.inputField} ${className}`}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    rows={rows || 4} // Default to 4 rows if not specified
                />
            );
        }

        return (
            <input
                type={type}
                className={`${styles.inputField} ${className}`} // Combine styles
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        );
    };

    return <div>{renderInput()}</div>; // Wrap in a div for consistent structure
};

export default InputField;
