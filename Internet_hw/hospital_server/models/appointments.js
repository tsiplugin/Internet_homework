const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  half: {
    type: Number,
    required: true,
  },
  day: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'day',
    required: true,
  },
});

module.exports = mongoose.model('appointment', appointmentSchema);
