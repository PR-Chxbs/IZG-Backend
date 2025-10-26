const express = require('express');
const { addPost, getPosts, getPost, getPostBySlug, updatePostById, deletePostById, publishPostById, unpublishPostById } = require('../controllers/postController');

const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, addPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/slug/:slug', getPostBySlug);
router.put('/:id', authenticate, updatePostById);
router.delete('/:id', authenticate, deletePostById);
router.put('/publish/:id', authenticate, publishPostById);
router.put('/unpublish/:id', authenticate, unpublishPostById);

module.exports = router;
