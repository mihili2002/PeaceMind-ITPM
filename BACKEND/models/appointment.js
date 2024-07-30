const mongoose = require('mongoose');

const appointmentsSchema=new mongoose.Schema({
     name: {
        type: String,
        required: true
     },
     
     address: {
        type: String,
        required: true
     },
     ContactNo: {
        type: Number,
        required: true
     },
     email: {
        type: String,
        required: true
     },
     therapist: {
      type: String,
   },
     
     time: {
      type: String
      
   },
   
     AppointmentDate: {
        type: Date,
        required: true
     },
})

const appointment=mongoose.model('appointment',appointmentsSchema);

module.exports =appointment;