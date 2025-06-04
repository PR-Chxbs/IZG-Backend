const pool = require('../config/db');

// Create
const createEvent = async (event) => {
    const { user_id, name, description, event_date } = event;
    const result = await pool.query(
        `INSERT INTO events (user_id, name, description, event_date, created_at) VALUES
         ($1, $2, $3, $4, NOW()) RETURNING *`,
        [user_id, name, description, event_date]
    );
    return result.rows[0];
}

// Read
const getAllEvents = async () => {
    const result = await pool.query(`SELECT * FROM events`);
    return result.rows;
}

// Update
const updateEvent = async (event_id, event) => {
    const { user_id, name, description, event_date } = event;
    const result = await pool.query(
        `UPDATE events SET
        user_id=$1, name=$2, description=$3, event_date=$4
        WHERE id=$5 RETURNING *`,
        [user_id, name, description, event_date, event_id]
    );
    return result.rows[0];
}

// Delete
const deleteEvent = async (event_id) => {
    await pool.query(`DELETE FROM events WHERE id=$1`, [event_id]);
}

// Read
const getEventById = async (event_id) => {
    const result = await pool.query(`SELECT * FROM events WHERE id=$1`, [event_id]);
    return result.rows[0];
}

const getEventByName = async (name) => {
    const result = await pool.query(`SELECT * FROM events WHERE name=$1`, [name]);
    return result.rows[0];
}

module.exports = {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent,
    getEventById,
    getEventByName
}