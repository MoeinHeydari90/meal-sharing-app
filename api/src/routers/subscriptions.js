// src/routers/subscriptions.js
import express from "express";
import knex from "../database_client.js"; // Make sure knex is configured correctly

const subscriptionsRouter = express.Router();

// POST /api/subscriptions - Adds a new email to the Subscriptions table
subscriptionsRouter.post("/", async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the email already exists
        const existingSubscription = await knex("Subscriptions").where({ email }).first();

        if (existingSubscription) {
            return res.status(400).json({ message: "This email is already subscribed." });
        }

        // Insert the email into the Subscriptions table
        const [newSubscriptionId] = await knex("Subscriptions").insert({ email }).returning("id");

        res.status(201).json({ message: "Subscription successful", id: newSubscriptionId });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: "Failed to add subscription" });
    }
});

export default subscriptionsRouter;
