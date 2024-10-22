// pages/_app.js
import "../styles/globals.css";
import Head from "next/head";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Meal Sharing App</title>
                <meta name="description" content="A simple meal sharing app" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header />
            <Component {...pageProps} /> {/* Render the main component for the page */}
            <Footer />
        </>
    );
}
