const express = require('express');
const Item = require('../models/Item');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, category, quantity } = req.body || {};

    if (!name || !category || quantity === undefined) {
      return res.status(400).json({
        message: 'name, category and quantity are required'
      });
    }

    const newItem = await Item.create({
      name,
      category,
      quantity
    });

    return res.status(201).json(newItem);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const items = await Item.find({}).sort({ createdAt: -1 });
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body || {}, {
      new: true,
      runValidators: true
    });

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    return res.json(updatedItem);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    return res.json({ message: 'Item deleted successfully', deletedItem });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
