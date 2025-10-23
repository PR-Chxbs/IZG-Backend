const pool = require('../config/db');

const createCategory = async (category) => {
    const name = category;
  const result = await pool.query(
    'INSERT INTO categories (name) VALUES ($1) RETURNING *',
    [name]
  );
  return result.rows[0];
};

const getAllCategories = async () => {
  const result = await pool.query('SELECT * FROM categories ORDER BY name ASC');
  return result.rows;
};

const getCategoryById = async (id) => {
  const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
  return result.rows[0];
};

const updateCategory = async (id, category) => {
  const {name} = category;
  const result = await pool.query(
    'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *',
    [name, id]
  );
  return result.rows[0];
};

const deleteCategory = async (id) => {
  await pool.query('DELETE FROM categories WHERE id = $1', [id]);
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
