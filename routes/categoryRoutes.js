const express = require('express');
const { addCategory, getCategories, getCategory, updateCategoryById, deleteCategoryById} = require('../controllers/categoryController');

const authenticate = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authenticate, allowRoles('Admin'), addCategory);
router.get('/', getCategories);
router.get('/:id', getCategory);
router.put('/:id', authenticate, allowRoles('Admin'), updateCategoryById);
router.delete('/:id', authenticate, allowRoles('Admin'), deleteCategoryById);

module.exports = router;