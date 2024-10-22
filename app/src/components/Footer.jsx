// src/components/Footer.jsx
import React from "react";
import Link from "next/link"; // Import Link for navigation
import styles from "./Footer.module.css"; // Import CSS styles

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link href="/">
                        <img src="logo.png" alt="Meal Sharing Logo" className={styles.logoImage} />
                    </Link>
                </div>
                <div className={styles.dividerLine}></div>
                <div className={styles.socialMedia}>
                    <a href="instagram.com">
                        <img
                            className={styles.socialIcon}
                            width="50"
                            height="50"
                            src="https://img.icons8.com/ios/50/FFFFFF/instagram-new--v1.png"
                            alt="instagram-new--v1"
                        />
                    </a>
                    <a href="facebook.com">
                        <img
                            className={styles.socialIcon}
                            width="50"
                            height="50"
                            src="https://img.icons8.com/ios/50/FFFFFF/facebook--v1.png"
                            alt="facebook--v1"
                        />
                    </a>
                    <a href="x.com">
                        <img
                            className={styles.socialIcon}
                            width="50"
                            height="50"
                            src="https://img.icons8.com/ios/50/FFFFFF/twitterx--v1.png"
                            alt="twitterx--v1"
                        />
                    </a>
                    <a href="youtube.com">
                        <img
                            className={styles.socialIcon}
                            width="50"
                            height="50"
                            src="https://img.icons8.com/ios/50/FFFFFF/youtube-squared.png"
                            alt="youtube-squared"
                        />
                    </a>
                </div>
                <div className={styles.copyRight}>© MealSharing 2024. All rights reserved.</div>
            </div>
        </footer>
    );
};

export default Footer;
