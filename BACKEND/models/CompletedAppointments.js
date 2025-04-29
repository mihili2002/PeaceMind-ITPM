const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name : 'String',
  address : 'String',
  ContactNo : 'Number',
  email : 'String',
  time : 'String',
  AppointmentDate : 'Date',
});

const CompletedAppointment = mongoose.model('CompletedAppointment', appointmentSchema);

module.exports = CompletedAppointment;