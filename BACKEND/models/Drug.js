const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DrugSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Drug name is required'],
        trim: true,  // Removes the surrounding white spaces
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [100, 'Name must be less than 100 characters long']
    },
    type: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number']
        
    },
    ExDate: {
        type: Date,
        required: [true, 'Expiration date is required'],
        min: [new Date(), 'Expiration date cannot be in the past']
    },
    supplierName: {
        type: String,
        required: [true, 'Supplier name is required'],
        trim: true,
        minlength: [3, 'Supplier name must be at least 3 characters long'],
        maxlength: [100, 'Supplier name must be less than 100 characters long']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1']
    
    },
    invoiceID: {
        type: String,
        required: false,
        trim: true
        
    }
});

const Drug = mongoose.model("Drug", DrugSchema);

module.exports = Drug;
