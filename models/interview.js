const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  companyName: String,
  date: Date,
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
