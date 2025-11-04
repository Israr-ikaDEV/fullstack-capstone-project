const express = require('express');
const router = express.Router();
const Gift = require('../models/Gift'); // Use Mongoose model

// GET all gifts
router.get('/', async (req, res) => {
  try {
    const gifts = await Gift.find();
    res.json(gifts);
  } catch (e) {
    console.error('Error fetching gifts:', e);
    res.status(500).send('Error fetching gifts');
  }
});

// GET gift by ID
router.get('/:id', async (req, res) => {
  try {
    const gift = await Gift.findById(req.params.id);
    if (!gift) return res.status(404).send('Gift not found');
    res.json(gift);
  } catch (e) {
    console.error('Error fetching gift:', e);
    res.status(500).send('Error fetching gift');
  }
});

// POST new gift
router.post('/', async (req, res) => {
  try {
    const gift = new Gift(req.body);
    await gift.save();
    res.status(201).json(gift);
  } catch (e) {
    console.error('Error adding gift:', e);
    res.status(500).send('Error adding gift');
  }
});

module.exports = router;
