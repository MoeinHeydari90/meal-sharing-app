// src/AboutPage.jsx
import React from "react";
import styles from "./AboutPage.module.css"; // Import CSS module

const AboutPage = () => {
    return (
        <div className={styles.container}>
            <h1>Our Values</h1>
            <p>
                <h3>Reduce Food Waste</h3>
                We actively work to minimize food waste by facilitating meal-sharing opportunities
                that benefit both hosts and guests. By redistributing excess food, we create a
                sustainable cycle that supports our planet.
            </p>
            <p>
                <h3> Foster Connections</h3>
                We aim to strengthen the bonds within our communities. Our platform enables
                individuals to connect, share meals, and build lasting relationships through shared
                experiences, celebrating the diversity of backgrounds and traditions.
            </p>
            <p>
                <h3>Promote Cultural Diversity</h3>
                Every meal has a story. We embrace culinary experiences that reflect various
                cultures, encouraging a deeper understanding and appreciation of the unique flavors
                and traditions that each community brings to the table.
            </p>
            <p>
                <h3>Support Local Economies</h3>
                By collaborating with local farmers, chefs, and food artisans, we support
                sustainable practices that uplift our communities. Our focus is on building local
                food economies that not only provide fresh, delicious meals but also empower the
                individuals who create them.
            </p>
        </div>
    );
};

export default AboutPage;
