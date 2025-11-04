const express = require('express');
const router = express.Router();
const Gift = require('../models/Gift'); // Mongoose model for gifts

// GET /api/search?name=&category=&condition=&age_years=
router.get('/', async (req, res) => {
    try {
        const { name, category, condition, age_years } = req.query;
        const filter = {};

        if (name && name.trim() !== '') {
            filter.name = { $regex: name.trim(), $options: 'i' }; // Case-insensitive
        }
        if (category && category.trim() !== '') {
            filter.category = category.trim();
        }
        if (condition && condition.trim() !== '') {
            filter.condition = condition.trim();
        }
        if (age_years && !isNaN(age_years)) {
            filter.age_years = { $lte: parseFloat(age_years) };
        }

        const gifts = await Gift.find(filter); // Mongoose handles connection and query

        res.json(gifts);
    } catch (err) {
        console.error('Error fetching filtered gifts:', err);
        res.status(500).send('Error fetching gifts');
    }
});

module.exports = router;
