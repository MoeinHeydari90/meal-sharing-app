// src/main.jsx or src/App.jsx
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // Import ThemeProvider and createTheme
import HomePage from "./components/HomePage/HomePage"; // Import HomePage
import MealsPage from "./components/MealsPage/MealsPage"; // Import MealsPage
import MealDetailPage from "./components/MealDetailPage/MealDetailPage"; // Import MealDetailPage
import JoinUsPage from "./components/JoinUsPage/JoinUsPage"; // Import JoinUsPage
import AddMealPage from "./components/AddMealPage/AddMealPage"; // Import the AddMealPage

const theme = createTheme(); // Create a default theme

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            {" "}
            {/* Wrap your app with ThemeProvider */}
            <Router>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/meals" component={MealsPage} />
                    <Route path="/meals/:id" component={MealDetailPage} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/join-us" component={JoinUsPage} />
                    <Route path="/add-meal" component={AddMealPage} />
                </Switch>
            </Router>
        </ThemeProvider>
    );
};

ReactDOM.render(<App />, document.getElementById("root")); // Ensure you have a root element in your HTML
