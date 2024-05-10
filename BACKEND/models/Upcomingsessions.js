const mongoose = require('mongoose');

const UpcomingSchema = new mongoose.Schema({
  name : 'String',
  address : 'String',
  ContactNo : 'Number',
  email : 'String',
  time : 'String',
  AppointmentDate : 'Date',

});

const Appointment = mongoose.model('Appointment', UpcomingSchema);

module.exports = Appointment;