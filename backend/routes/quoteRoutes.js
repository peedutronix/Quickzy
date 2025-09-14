const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');

// @route   POST api/quotes
// @desc    Create a new quote request
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, serviceType } = req.body;
    
    // Create new quote
    const newQuote = new Quote({
      name,
      email,
      phone,
      message,
      serviceType
    });
    
    const quote = await newQuote.save();
    res.status(201).json(quote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/quotes
// @desc    Get all quotes
// @access  Private (in a real app, this would be protected)
router.get('/', async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;