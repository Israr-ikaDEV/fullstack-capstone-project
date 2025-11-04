const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  category: String
}, { timestamps: true });

module.exports = mongoose.model('Gift', giftSchema);
