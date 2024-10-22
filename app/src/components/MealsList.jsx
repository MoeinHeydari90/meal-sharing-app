// src/components/MealsList.jsx
import React, { useState, useEffect } from "react";
import Meal from "./Meal"; // Import the Meal component
import Link from "next/link"; // Import Link for navigation
import styles from "./MealsList.module.css"; // Optional: Create a CSS module for styling

const MealsList = ({ searchTerm, sortKey, sortDir, availableOnly }) => {
    const [meals, setMeals] = useState([]);

    // Fetch meals from API when the component mounts or when searchTerm, sortKey, sortDir, or availableOnly changes
    useEffect(() => {
        const fetchMeals = async () => {
            // Construct API URL based on filter options
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/meals?title=${searchTerm}&sortKey=${sortKey}&sortDir=${sortDir}${availableOnly ? "&availableReservations=true" : ""}`;

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
                }
                const data = await response.json();

                setMeals(data); // Set the meals state with fetched data
            } catch (error) {
                console.error("Error fetching meals:", error);
            }
        };

        fetchMeals();
    }, [searchTerm, sortKey, sortDir, availableOnly]); // Fetch meals whenever searchTerm, sortKey, sortDir or availableOnly changes

    return (
        <div className={styles.mealsGrid}>
            {meals.length > 0 ? (
                meals.map((meal) => (
                    <Link key={meal.id} href={`/meals/${meal.id}`} passHref>
                        <div>
                            <Meal meal={meal} /> {/* Render the Meal component for each meal */}
                        </div>
                    </Link>
                ))
            ) : (
                <p>No meals available at the moment.</p>
            )}
        </div>
    );
};

export default MealsList;
