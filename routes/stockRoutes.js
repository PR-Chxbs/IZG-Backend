const express = require('express');
const { addStock, getStockItems, getStockItem, updateStockItemById, deleteStockItemById } = require('../controllers/stockController');

const authenticate = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authenticate, allowRoles('Admin'), addStock);
router.get('/', getStockItems);
router.get('/:id', getStockItem);
router.put('/:id', authenticate, allowRoles('Admin'), updateStockItemById);
router.delete('/:id', authenticate, allowRoles('Admin'), deleteStockItemById);

module.exports = router;
