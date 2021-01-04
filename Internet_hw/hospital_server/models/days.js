const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('day', daySchema);
