// src/MealsPage.jsx
import React, { useState } from "react";
import MealsList from "../MealsList"; // Import the MealsList component
import styles from "./MealsPage.module.css"; // Import CSS module
import { useRouter } from "next/router"; // Import useRouter
import InputField from "../InputField"; // Import InputField component

const MealsPage = () => {
    const router = useRouter(); // Initialize router
    const { title } = router.query; // Get title from the query params

    const [sortKey, setSortKey] = useState("when"); // Default sort key
    const [sortDir, setSortDir] = useState("ASC"); // Default sort direction
    const [searchTerm, setSearchTerm] = useState(title || ""); // State for search term
    const [availableOnly, setAvailableOnly] = useState(false); // State for filtering available meals

    const handleSortKeyChange = (e) => {
        setSortKey(e.target.value);
    };

    const handleSortDirChange = (e) => {
        setSortDir(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/meals?title=${searchTerm}&availableReservations=${availableOnly}`); // Include availability in the query
    };

    const handleAvailableOnlyChange = (e) => {
        const isChecked = e.target.checked; // Get the checkbox state
        setAvailableOnly(isChecked); // Update state based on checkbox status
        router.push(`/meals?title=${searchTerm}&availableReservations=${isChecked}`); // Redirect with the updated query
    };

    return (
        <div className={styles.mealsPage}>
            <div className={styles.controls}>
                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <InputField
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update the state as the user types
                        placeholder="Search meals..."
                        className={styles.searchInput}
                    />
                </form>
                <div className={styles.sortWrapper}>
                    <label htmlFor="sortKey">Sort By:</label>
                    <select id="sortKey" value={sortKey} onChange={handleSortKeyChange}>
                        <option value="when">Date</option>
                        <option value="max_reservations">Max Reservations</option>
                        <option value="price">Price</option>
                    </select>
                </div>
                <div className={styles.sortWrapper}>
                    <label htmlFor="sortDir">Order:</label>
                    <select id="sortDir" value={sortDir} onChange={handleSortDirChange}>
                        <option value="ASC">Ascending</option>
                        <option value="DESC">Descending</option>
                    </select>
                </div>

                <div className={styles.checkboxWrapper}>
                    <input
                        type="checkbox"
                        id="availableOnly"
                        checked={availableOnly}
                        onChange={handleAvailableOnlyChange}
                    />
                    <label htmlFor="availableOnly">Available spots only</label>
                </div>
            </div>
            <MealsList
                searchTerm={searchTerm}
                sortKey={sortKey}
                sortDir={sortDir}
                availableOnly={availableOnly} // Pass the availableOnly state
            />
        </div>
    );
};

export default MealsPage;
