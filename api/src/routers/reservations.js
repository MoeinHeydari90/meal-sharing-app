// /api/src/routers/reservations.js

import express from "express";
import knex from "../database_client.js";

const reservationsRouter = express.Router();

// GET /api/reservations - Returns all reservations
reservationsRouter.get("/", async (req, res) => {
    try {
        const reservations = await knex.select("*").from("Reservation").orderBy("id", "ASC");
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve reservations" });
    }
});

// POST /api/reservations - Adds a new reservation to the database
reservationsRouter.post("/", async (req, res) => {
    const {
        number_of_guests, // Expect this from the request
        meal_id, // Expect this from the request
        created_date, // Expect this from the request
        contact_phonenumber,
        contact_name,
        contact_email,
    } = req.body;

    try {
        const [newReservationId] = await knex("Reservation")
            .insert({
                number_of_guests,
                meal_id,
                created_date,
                contact_phonenumber,
                contact_name,
                contact_email,
            })
            .returning("id");
        res.status(201).json({ message: "Reservation added successfully", id: newReservationId });
    } catch (error) {
        res.status(500).json({ error: "Failed to add reservation" });
    }
});

// GET /api/reservations/:id - Returns a reservation by id
reservationsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await knex("Reservation").where({ id }).first();
        if (reservation) {
            res.json(reservation);
        } else {
            res.status(404).json({ message: "Reservation not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve reservation" });
    }
});

// PUT /api/reservations/:id - Updates the reservation by id
reservationsRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const {
        number_of_guests,
        meal_id,
        created_date,
        contact_phonenumber,
        contact_name,
        contact_email,
    } = req.body;
    try {
        const updatedRows = await knex("Reservation").where({ id }).update({
            number_of_guests,
            meal_id,
            created_date,
            contact_phonenumber,
            contact_name,
            contact_email,
        });
        if (updatedRows > 0) {
            res.json({ message: "Reservation updated successfully" });
        } else {
            res.status(404).json({ message: "Reservation not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update reservation" });
    }
});

// DELETE /api/reservations/:id - Deletes the reservation by id
reservationsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await knex("Reservation").where({ id }).del();
        if (deletedRows > 0) {
            res.json({ message: "Reservation deleted successfully" });
        } else {
            res.status(404).json({ message: "Reservation not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete reservation" });
    }
});

export default reservationsRouter;
