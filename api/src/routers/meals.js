// src/routers/meals.js
import express from "express";
import knex from "../database_client.js"; // Import the configured knex instance

const mealsRouter = express.Router();

// GET /api/meals - Returns all meals, with optional filtering
mealsRouter.get("/", async (req, res) => {
    try {
        // Start building the query to fetch all meals from the "Meal" table
        let query = knex("Meal")
            .select("Meal.*")
            .leftJoin("Review", "Meal.id", "Review.meal_id") // Join with Review table
            .groupBy("Meal.id") // Group results by meal id to aggregate ratings
            .avg("Review.stars as averageRating"); // Calculate average rating

        // Extract query parameters
        const {
            maxPrice, // Maximum price for filtering meals
            availableReservations, // Filter by availability of reservations
            title, // Filter meals by title (case-insensitive)
            dateAfter, // Filter meals after a specific date
            dateBefore, // Filter meals before a specific date
            limit, // Limit the number of returned results
            sortKey, // Key to sort the results by
            sortDir, // Sorting direction (ASC/DESC)
        } = req.query;

        // Filter by maxPrice if provided
        if (maxPrice) {
            query = query.where("price", "<=", parseFloat(maxPrice));
        }

        // Filter by available reservations if the parameter is provided
        if (availableReservations === "true") {
            query = query.where("current_reservations", "<", knex.raw("max_reservations")); // Check available spots
        }

        // Filter by title (case-insensitive)
        if (title) {
            query = query.where("Meal.title", "like", `%${title}%`); // Specify table name
        }

        // Filter by meals after a specific date
        if (dateAfter) {
            query = query.where("when", ">", dateAfter);
        }

        // Filter by meals before a specific date
        if (dateBefore) {
            query = query.where("when", "<", dateBefore);
        }

        // Limit the number of meals returned
        if (limit) {
            const parsedLimit = parseInt(limit);
            if (parsedLimit > 0) {
                query = query.limit(parsedLimit);
            } else {
                return res.status(400).json({
                    error: "Invalid value for 'limit', It must be a positive integer.",
                });
            }
        }

        // Sort results by sortKey and direction (ASC or DESC)
        if (sortKey) {
            const validSortKeys = ["when", "max_reservations", "price"]; // Only allow sorting by valid keys
            const validSortDirs = ["ASC", "DESC"];
            const FormattedSortDir =
                sortDir && validSortDirs.includes(sortDir.toUpperCase())
                    ? sortDir.toUpperCase()
                    : "ASC"; // Default sort direction is ASC

            if (validSortKeys.includes(sortKey)) {
                query = query.orderBy(sortKey, FormattedSortDir);
            } else {
                return res.status(400).json({
                    error: "Invalid value for sortKey.",
                });
            }
        }

        // Execute the query to retrieve meals based on the filters
        const meals = await query;

        // Respond with the filtered meals, including average ratings
        res.json(meals);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve meals" });
    }
});

// POST /api/meals - Adds a new meal to the database
mealsRouter.post("/", async (req, res) => {
    const {
        id,
        title,
        description,
        location,
        when,
        max_reservations,
        price,
        created_date,
        image_url,
    } = req.body;
    try {
        // Insert a new meal into the "Meal" table and return the new meal's ID
        const [newMealId] = await knex("Meal")
            .insert({
                id,
                title,
                description,
                location,
                when,
                max_reservations,
                price,
                created_date,
                image_url,
            })
            .returning("id");
        res.status(201).json({ message: "Meal added successfully", id: newMealId });
    } catch (error) {
        res.status(500).json({ error: "Failed to add meal" });
    }
});

// GET /api/meals/:id - Returns the meal by id with current reservation count and average rating
mealsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        // Fetch the meal details
        const meal = await knex("Meal")
            .leftJoin("Reservation", "Meal.id", "Reservation.meal_id")
            .select("Meal.*")
            .where("Meal.id", id)
            .groupBy("Meal.id")
            .first();

        if (meal) {
            // Calculate available reservations
            meal.available_reservations = meal.max_reservations - meal.current_reservations;

            // Fetch the average rating for the meal
            const [ratingData] = await knex("Review")
                .where("meal_id", id)
                .select(knex.raw("AVG(stars) AS averageRating"));

            // Attach averageRating to meal if it exists
            meal.averageRating = ratingData
                ? parseFloat(ratingData.averageRating).toFixed(4)
                : null;

            res.json(meal);
        } else {
            res.status(404).json({ message: "Meal not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve meal" });
    }
});

// PUT /api/meals/:id - Updates the meal by id
mealsRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, location, when, max_reservations, price, created_date } = req.body;
    try {
        const updatedRows = await knex("Meal")
            .where({ id })
            .update({ title, description, location, when, max_reservations, price, created_date });
        if (updatedRows > 0) {
            res.json({ message: "Meal updated successfully" });
        } else {
            res.status(404).json({ message: "Meal not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update meal" });
    }
});

// DELETE /api/meals/:id - Deletes the meal by id
mealsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await knex("Meal").where({ id }).del();
        if (deletedRows > 0) {
            res.json({ message: "Meal deleted successfully" });
        } else {
            res.status(404).json({ message: "Meal not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete meal" });
    }
});

export default mealsRouter;
