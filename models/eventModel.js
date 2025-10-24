const pool = require('../config/db');

// Create
const createEvent = async (event) => {
    const { user_id, name, description, event_date, location, start_time, end_time, image_url } = event;
    const result = await pool.query(
        `INSERT INTO events (user_id, name, description, event_date, location, start_time, end_time, image_url, created_at) VALUES
         ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) RETURNING *`,
        [user_id, name, description, event_date, location, start_time, end_time, image_url]
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
    const { user_id, name, description, event_date, location, start_time, end_time, image_url } = event;
    const result = await pool.query(
        `UPDATE events SET
        user_id=$1, name=$2, description=$3, event_date=$4, location=$5, start_time=$6, end_time=$7, image_url=$8
        WHERE id=$9 RETURNING *`,
        [user_id, name, description, event_date, location, start_time, end_time, image_url, event_id]
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