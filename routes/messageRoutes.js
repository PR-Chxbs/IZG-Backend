const { createFormMessage, getAllMessages} = require("../controllers/messageController");
const express = require('express');

const router = express.Router();

router.post("/", createFormMessage);
router.get("/", getAllMessages);

module.exports = router;
