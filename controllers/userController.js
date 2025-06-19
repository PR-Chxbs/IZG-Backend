const bcrypt = require('bcryptjs');

const { getAllUsers, findUserById, updateUser, deleteUser, createUser } = require('../models/userModel');

const addUser = async (req, res) => {
    try {
        const { username, first_name, second_name, gender, dob, phone_number, email, password, role } = req.body;
        // Check if user exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) return res.status(400).json({ message: 'Email already in use' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser({
            username, first_name, second_name, gender, dob, phone_number, email, password: hashedPassword, role
        });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add user' });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await findUserById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch user' });
    }
};

const updateUserById = async (req, res) => {
    try {
        const updatedUser = await updateUser(req.params.id, req.body);
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update user' });
    }
};

const deleteUserById = async (req, res) => {
    try {
        await deleteUser(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete user' });
    }
};

module.exports = {
    addUser,
    getUsers,
    getUser,
    updateUserById,
    deleteUserById,
};
