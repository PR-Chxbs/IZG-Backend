const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../models/categoryModel');

const addCategory = async (req, res) => {
    try {
        const category = await createCategory(req.body.name);
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ message: 'Error creating category', error: err.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching categories', error: err.message });
    }
};

const getCategory = async (req, res) => {
    try {
        const category = await getCategoryById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching category', error: err.message });
    }
};

const updateCategoryById = async (req, res) => {
    try {
        const updated = await updateCategory(req.params.id, req.body.name);
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Error updating category', error: err.message });
    }
};

const deleteCategoryById = async (req, res) => {
    try {
        await deleteCategory(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Error deleting category', error: err.message });
    }
};

module.exports = {
    addCategory,
    getCategories,
    getCategory,
    updateCategoryById,
    deleteCategoryById
};
