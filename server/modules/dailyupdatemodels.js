const mongoose = require('mongoose');

const DailyUpdateSchema = new mongoose.Schema({
    description: String,
    department: String,
    date: String,
  });
const DailyUpdate = mongoose.model('DailyUpdate', DailyUpdateSchema);

module.exports = DailyUpdate;