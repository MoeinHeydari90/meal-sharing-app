// src/components/HomePage/HomePage.jsx
import React from "react";
import styles from "./HomePage.module.css"; // Import CSS styles

const HomePage = () => {
    return (
        <div className={styles.homepage}>
            <div className={styles.videoWrapper}>
                <video className={styles.backgroundVideo} autoPlay loop muted playsInline>
                    <source
                        src="https://videos.pexels.com/video-files/3015488/3015488-hd_1920_1080_24fps.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
                <div className={styles.textOverlay}>
                    <h1 className={styles.mainTitle}>Welcome to Meal Sharing</h1>
                    <h2 className={styles.subtitle}>Try the best food with us</h2>
                    <p className={styles.description}>
                        If you want to taste memorable food, you’re in the right place.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
