const { createMessage, getMessages } = require("../models/messageModel");

const createFormMessage = async (req, res) => {
    try {
        const message = await createMessage(req.body);
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: 'Error creating message', error: err.message });
    }
}

const getAllMessages = async (req, res) => {
    try {
        const messages = await getMessages();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error: err.message });
    }
}

module.exports = {
    createFormMessage,
    getAllMessages
}