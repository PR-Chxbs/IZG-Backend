const express = require('express');
const { addUser, getUsers, getUser, updateUserById, deleteUserById } = require('../controllers/userController');

const authenticate = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authenticate, allowRoles('Admin'), addUser);
router.get('/', authenticate, allowRoles('Admin'), getUsers);
router.get('/:id', authenticate, getUser);
router.put('/:id', authenticate, updateUserById);
router.delete('/:id', authenticate, allowRoles('Admin'), deleteUserById);

module.exports = router;
