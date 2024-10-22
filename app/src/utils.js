// src/utils.js

// Function to format a date string into the 'dd/mm/yyyy' format
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with zero if necessary
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed) and pad
    const year = date.getFullYear(); // Get full year
    return `${day}/${month}/${year}`; // Return formatted date
};
