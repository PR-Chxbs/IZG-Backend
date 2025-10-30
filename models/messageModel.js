const pool = require('../config/db');

const createMessage = async (message) => {
    const { full_name, email, phone_number, inquiry_type } = message;
    const createQuery = `
        INSERT INTO messages (full_name, email, phone_number, inquiry_type, sent_at)
        VALUES ($1, $2, $3, $4, NOW())
        RETURNING *;
    `;

    const result = await pool.query(createQuery, [full_name, email, phone_number, inquiry_type]);
    return result.rows[0];
}

const getMessages = async () => {
    const getQuery = `SELECT * FROM messages ORDER BY sent_at DESC;`
    const result = await pool.query(getQuery);
    
    return result.rows;
}

module.exports = {
    createMessage,
    getMessages
}