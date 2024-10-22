import "dotenv/config"; // Loads environment variables from a .env file into process.env
import express from "express"; // Imports the express framework
import cors from "cors"; // Imports the CORS middleware to enable Cross-Origin Resource Sharing
import bodyParser from "body-parser"; // Imports the body-parser middleware to parse incoming request bodies
import knex from "./database_client.js"; // Imports the configured knex instance for database queries
import mealsRouter from "./routers/meals.js"; // Import the meals router
import reservationsRouter from "./routers/reservations.js"; // Import the reservations router
import reviewsRouter from "./routers/reviews.js"; // Import the reviews router
import subscriptionsRouter from "./routers/subscriptions.js"; // Import the subscriptions router

const app = express(); // Creates an instance of an express application

// Middleware setup
app.use(cors()); // Enables CORS for all routes
app.use(bodyParser.json()); // Parses incoming JSON request bodies

const apiRouter = express.Router(); // Creates a new router instance for API routes

// Register routers
apiRouter.use("/meals", mealsRouter); // Mount the meals router under '/api/meals' path
apiRouter.use("/reservations", reservationsRouter); // Mount the reservations router under '/api/reservations' path
apiRouter.use("/reviews", reviewsRouter); // Mount the reviews router under the '/api/reviews' path
apiRouter.use("/subscriptions", subscriptionsRouter); // Mount the subscriptions router under '/api/subscriptions' path

app.use("/api", apiRouter); // Mounts the API router under the '/api' path

// Route to get future meals
app.get("/future-meals", async (req, res) => {
    try {
        const futureMeals = await knex.raw(
            "SELECT * FROM Meal WHERE created_date >= NOW() ORDER BY created_date DESC"
        );
        res.json(futureMeals.rows); // Return the list of future meals
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve future meals" });
    }
});

// Route to get past meals
app.get("/past-meals", async (req, res) => {
    try {
        const pastMeals = await knex.raw(
            "SELECT * FROM Meal WHERE created_date <= NOW() ORDER BY created_date DESC"
        );
        res.json(pastMeals.rows); // Return the list of past meals
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve past meals" });
    }
});

// Route to get all meals
app.get("/all-meals", async (req, res) => {
    try {
        const allMeals = await knex.raw("SELECT * FROM Meal ORDER BY ID ASC");
        res.json(allMeals.rows); // Return all meals
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve all meals" });
    }
});

// Route to get the first meal
app.get("/first-meal", async (req, res) => {
    try {
        const firstMeal = await knex.raw("SELECT * FROM Meal ORDER BY ID ASC LIMIT 1");
        if (firstMeal.rows.length > 0) {
            res.json(firstMeal.rows[0]); // Send the first meal if found
        } else {
            res.status(404).json({ error: "No meals found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve the first meal" });
    }
});

// Route to get the last meal
app.get("/last-meal", async (req, res) => {
    try {
        const lastMeal = await knex.raw("SELECT * FROM Meal ORDER BY ID DESC LIMIT 1");
        if (lastMeal.rows.length > 0) {
            res.json(lastMeal.rows[0]); // Send the last meal if found
        } else {
            res.status(404).json({ error: "No meals found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve the last meal" });
    }
});
