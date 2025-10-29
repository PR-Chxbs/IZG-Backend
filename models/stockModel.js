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
  const originalQuery = 'SELECT * FROM stock ORDER BY updated_at DESC';
  const joinQuery = `
    SELECT
      s.id,
      s.category_id,
      s.name,
      c.name AS category_name,
      s.quantity,
      s.image,
      s.updated_at,
      s.created_at
    FROM
      stock s
    JOIN
      categories c ON s.category_id = c.id
    ORDER BY 
      s.updated_at DESC;
  `;
  const result = await pool.query(joinQuery);
  return result.rows;
};

const getStockById = async (id) => {
  const originalQuery = 'SELECT * FROM stock WHERE id = $1';
  const joinQuery = `
    SELECT
      s.id,
      s.category_id,
      s.name,
      c.name AS category_name,
      s.quantity,
      s.image,
      s.updated_at,
      s.created_at
    FROM
      stock s
    JOIN
      categories c ON s.category_id = c.id
    WHERE
      s.id = $1;
  `;
  const result = await pool.query(joinQuery, [id]);
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

const updateStockPartial = async (id, data) => {
  // Build dynamic SET clause
  const fields = [];
  const values = [];

  Object.entries(data).forEach(([key, value], index) => {
    fields.push(`${key} = $${index + 1}`);
    values.push(value);
  });

  // Add ID as last param
  values.push(id);

  const query = `
    UPDATE stock
    SET ${fields.join(', ')}
    WHERE id = $${values.length}
    RETURNING *;
  `;

  const result = await pool.query(query, values);
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
  updateStockPartial
};
