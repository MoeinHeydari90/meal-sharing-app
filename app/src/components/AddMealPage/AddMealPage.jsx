// src/components/AddMealPage/AddMealPage.jsx
import React, { useState } from "react";
import styles from "./AddMealPage.module.css"; // Import CSS styles
import Button from "../Button"; // Import the Button component
import InputField from "../InputField"; // Import your InputField component
import { useRouter } from "next/router"; // Import useRouter for navigation

const AddMealPage = () => {
    const router = useRouter(); // Initialize router
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [maxReservations, setMaxReservations] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState(""); // New state for image URL
    const [date, setDate] = useState(""); // New state for date

    const handleSubmit = async (e) => {
        e.preventDefault();
        const mealData = {
            title,
            location,
            max_reservations: maxReservations,
            price,
            description,
            image_url: imageUrl,
            created_date: new Date().toISOString().split("T")[0],
            when: date,
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/meals`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(mealData),
            });

            if (response.ok) {
                alert("Meal added successfully!");
                router.push("/meals");
            } else {
                throw new Error("Failed to add meal");
            }
        } catch (error) {
            console.error("Error adding meal:", error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Add a Meal</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <InputField
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <InputField
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
                <InputField
                    type="number"
                    placeholder="Max Reservations"
                    value={maxReservations}
                    onChange={(e) => setMaxReservations(e.target.value)}
                    required
                />
                <InputField
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <InputField
                    type="textarea"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <InputField
                    type="text"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                />
                <InputField
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <Button type="submit">Save</Button>
            </form>
        </div>
    );
};

export default AddMealPage;
