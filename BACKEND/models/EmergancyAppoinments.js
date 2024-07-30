const mongoose = require('mongoose');

const emergancyAppoinmentsSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  contact: String,
  gender: String,
  doctor: String,
  currently: String,
  category: String,
  reason: String,
  currentDate: Date,
  CreatedAt: Date
}); 

const EmergancyAppoinments = mongoose.model('EmergancyAppoinments', emergancyAppoinmentsSchema);
module.exports = EmergancyAppoinments;
