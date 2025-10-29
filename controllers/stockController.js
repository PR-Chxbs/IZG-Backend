const { createStock, getAllStock, getStockById, updateStock, updateStockPartial, deleteStock } = require('../models/stockModel');

const addStock = async (req, res) => {
    try {
        const stock = await createStock(req.body);
        res.status(201).json(stock);
    } catch (err) {
        res.status(500).json({ message: 'Error creating stock item', error: err.message });
    }
};

const getStockItems = async (req, res) => {
    try {
        const stock = await getAllStock();
        res.status(200).json(stock);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching stock items', error: err.message });
    }
};

const getStockItem = async (req, res) => {
    try {
        const stockItem = await getStockById(req.params.id);
        if (!stockItem) return res.status(404).json({ message: 'Stock item not found' });
        res.status(200).json(stockItem);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching stock item', error: err.message });
    }
};

const updateStockItemById = async (req, res) => {
    try {
        const updated = await updateStock(req.params.id, req.body);
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Error updating stock item', error: err.message });
    }
};

const patchStock = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No fields provided to update." });
    }

    const updatedStock = await updateStockPartial(id, updateData);

    if (!updatedStock) {
      return res.status(404).json({ message: "Stock not found." });
    }

    return res.status(200).json(updatedStock);

  } catch (err) {
    console.error("PATCH ERROR:", err);
    return res.status(500).json({ message: "Server error." });
  }
};

const deleteStockItemById = async (req, res) => {
    try {
        await deleteStock(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Error deleting stock item', error: err.message });
    }
};

module.exports = {
    addStock,
    getStockItems,
    getStockItem,
    updateStockItemById,
    deleteStockItemById,
    patchStock
};
