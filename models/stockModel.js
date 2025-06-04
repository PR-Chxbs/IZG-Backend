const pool = require('../config/db');

const createStock = async (stock) => {
  const { category_id, name, quantity, image } = stock;
  const result = await pool.query(
    `INSERT INTO stock (category_id, name, quantity, image, updated_at, created_at)
     VALUES ($1, $2, $3, $4, NOW(), NOW())
     RETURNING *`,
    [category_id, name, quantity, image]
  );
  return result.rows[0];
};

const getAllStock = async () => {
  const result = await pool.query('SELECT * FROM stock ORDER BY updated_at DESC');
  return result.rows;
};

const getStockById = async (id) => {
  const result = await pool.query('SELECT * FROM stock WHERE id = $1', [id]);
  return result.rows[0];
};

const updateStock = async (id, stock) => {
  const { name, quantity, image } = stock;
  const result = await pool.query(
    `UPDATE stock
     SET name = $1, quantity = $2, image = $3, updated_at = NOW()
     WHERE id = $4
     RETURNING *`,
    [name, quantity, image, id]
  );
  return result.rows[0];
};

const deleteStock = async (id) => {
  await pool.query('DELETE FROM stock WHERE id = $1', [id]);
};

module.exports = {
  createStock,
  getAllStock,
  getStockById,
  updateStock,
  deleteStock,
};
