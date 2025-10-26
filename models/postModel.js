const pool = require('../config/db');

// Create
const createPost = async (post) => {
  const { author_id, title, slug, content, cover_image, published, published_at } = post;
  const result = await pool.query(
    `INSERT INTO posts (author_id, title, slug, content, cover_image, published, published_at, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
     RETURNING *`,
    [author_id, title, slug, content, cover_image, published, published_at]
  );
  return result.rows[0];
};

// Read
const getAllPosts = async () => {
  const originalQuery = 'SELECT * FROM posts ORDER BY created_at DESC';
  const joinQuery = `
    SELECT
      p.id,
      p.author_id,
      u.first_name,
      p.title,
      p.slug,
      p.content,
      p.cover_image,
      p.published,
      p.published_at,
      p.created_at,
      p.updated_at
    FROM
      posts p
    JOIN
      users u ON p.author_id = u.id
    ORDER BY 
      p.created_at DESC;
  `;
  const result = await pool.query(joinQuery);
  return result.rows;
};


const getPostById = async (id) => {
  const originalQuery = 'SELECT * FROM posts WHERE id = $1';
  const joinQuery = `
    SELECT
      p.id,
      p.author_id,
      u.first_name,
      p.title,
      p.slug,
      p.content,
      p.cover_image,
      p.published,
      p.published_at,
      p.created_at,
      p.updated_at
    FROM
      posts p
    JOIN
      users u ON p.author_id = u.id
    WHERE
      u.id = $1;
  `;
  const result = await pool.query(joinQuery, [id]);
  return result.rows[0];
};

// Update
const updatePost = async (post_id, post) => {
  const { author_id, title, slug, content, cover_image } = post;
  const result = await pool.query(
    `UPDATE posts
     SET author_id = $1, title = $2, slug = $3, content = $4, cover_image = $5, updated_at = NOW()
     WHERE id = $6
     RETURNING *`,
    [author_id, title, slug, content, cover_image, post_id]
  );
  return result.rows[0];
};

// Delete
const deletePost = async (id) => {
  await pool.query('DELETE FROM posts WHERE id = $1', [id]);
};

// Publish
const publishPost = async (id) => {
  const result = await pool.query(
    `UPDATE posts SET
    published = true, published_at = NOW()
    WHERE id = $1
    RETURNING *`,
    [id]
  );
  return result.rows[0];
}

// Unpublish
const unpublishPost = async (id) => {
  const result = await pool.query(
    `UPDATE posts SET
    published = false, published_at = null
    WHERE id = $1
    RETURNING *`,
    [id]
  );
  return result.rows[0];
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  publishPost,
  unpublishPost
};
