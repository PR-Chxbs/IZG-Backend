const { createPost, getAllPosts, getPostById, updatePost, deletePost, publishPost, unpublishPost } = require('../models/postModel');

const addPost = async (req, res) => {
    try {
        const post = await createPost(req.body);
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: 'Error creating post', error: err.message });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching posts', error: err.message });
    }
};

const getPost = async (req, res) => {
    try {
        const post = await getPostById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching post', error: err.message });
    }
};

const updatePostById = async (req, res) => {
    try {
        const updated = await updatePost(req.params.id, req.body);
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Error updating post', error: err.message });
    }
};

const deletePostById = async (req, res) => {
    try {
        await deletePost(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Error deleting post', error: err.message });
    }
};

const publishPostById = async (req, res) => {
    try {
        const post = await publishPost(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: 'Error publishing post', error: err.message});
    }
}

const unpublishPostById = async (req, res) => {
    try {
        const post = await unpublishPost(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: 'Error unpublishing post', error: err.message});
    }
}

module.exports = {
    addPost,
    getPosts,
    getPost,
    updatePostById,
    deletePostById,
    publishPostById,
    unpublishPostById
};