// src/components/Header.jsx
import React, { useState } from "react"; // Import useState
import styles from "./Header.module.css"; // Import CSS styles
import Link from "next/link"; // Import Link for navigation
import { useRouter } from "next/router"; // Import useRouter for navigation

const Header = () => {
    const router = useRouter(); // Initialize router

    // State to manage the current flag
    const [isEnglish, setIsEnglish] = useState(true); // Default to English

    const toggleLanguage = () => {
        setIsEnglish(!isEnglish); // Toggle the language state
    };

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <Link href="/">
                    <img src="logo.png" alt="Meal Sharing Logo" className={styles.logoImage} />
                </Link>
            </div>
            <div className={styles.navContainer}>
                {" "}
                {/* New container for navigation */}
                <nav>
                    <ul className={styles.navList}>
                        <li>
                            <Link
                                href="/meals"
                                className={router.pathname === "/meals" ? styles.activeNavItem : ""}
                            >
                                Meals
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className={router.pathname === "/about" ? styles.activeNavItem : ""}
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/join-us"
                                className={
                                    router.pathname === "/join-us" ? styles.activeNavItem : ""
                                }
                            >
                                Join us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/add-meal"
                                className={
                                    router.pathname === "/add-meal" ? styles.activeNavItem : ""
                                }
                            >
                                Add Meal
                            </Link>
                        </li>

                        <div className={styles.languageSwitcher} onClick={toggleLanguage}>
                            <img
                                src={
                                    isEnglish
                                        ? "https://vectorflags.s3.amazonaws.com/flags/uk-button-01.png"
                                        : "https://vectorflags.s3-us-west-2.amazonaws.com/flags/dk-button-01.png"
                                }
                                alt={isEnglish ? "English Flag" : "Danish Flag"}
                                className={styles.flagImage}
                            />
                        </div>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
