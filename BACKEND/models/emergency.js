// Define the schema
const mongoose = require('mongoose');
const schemaData = mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    contact: String,
    gender: String,
    doctor: String,
    currently: String,
    category: String,
    reason: String,
    currentDate: String
}, {
    timestamps: true
})

// Create a model from the schema
module.exports = mongoose.model("emergancyappoinment", schemaData);
