const pool = require('../config/db');

// Create
const createUser = async (user) => {
  const { username, first_name, second_name, gender, dob, phone_number, email, password, role } = user;
  const result = await pool.query(
    `INSERT INTO users 
      (username, first_name, second_name, gender, dob, phone_number, email, password, role, created_at) 
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW()) RETURNING *`,
    [username, first_name, second_name, gender, dob, phone_number, email, password, role]
  );
  return result.rows[0];
};

// Read
const getAllUsers = async () => {
  const result = await pool.query('SELECT id, username, first_name, second_name, gender, dob, phone_number, email, role, created_at FROM users');
  return result.rows;
};

// Update
const updateUser = async (userId, user) => {
  const { username, first_name, second_name, gender, dob, phone_number, email, role } = user;
  const result = await pool.query(
    `UPDATE users SET
      username=$1, first_name=$2, second_name=$3, gender=$4, dob=$5, phone_number=$6, email=$7, role=$8
    WHERE id=$9 RETURNING id, username, first_name, second_name, gender, dob, phone_number, email, role, created_at`,
    [username, first_name, second_name, gender, dob, phone_number, email, role, userId]
  );
  return result.rows[0];
};

// Delete
const deleteUser = async (userId) => {
  await pool.query('DELETE FROM users WHERE id=$1', [userId]);
};

const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};



module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};