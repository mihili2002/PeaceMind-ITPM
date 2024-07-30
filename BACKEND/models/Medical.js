const mongoose = require('mongoose');

// Define the Medication schema, detailing each medication's name and dosage
const MedicationSchema = new mongoose.Schema({
    medicationName: {
        type: String,
        required: true
    },
    dosage: {
        type: String,
        required: true
    },
    quantityPerDay: {
        type: Number,
        required: true
    }

});

// Define the main Medical schema with fields for patient and doctor information,
// including an array of medications from the MedicationSchema
const MedicalSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    medications: [MedicationSchema], // Array of Medication objects
    refills: {
        type: Number,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now // Automatically set the created date to the current time
    },
    name: { type: String},
    price: { type: Number}
});

// Compile and export the Medical model based on the MedicalSchema
const Medical = mongoose.model('Medical', MedicalSchema);
module.exports = Medical;