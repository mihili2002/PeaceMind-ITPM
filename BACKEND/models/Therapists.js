const mongoose = require('mongoose');

const TherapistsSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    nic:{
        type:String,
        required:true
    },
    gender: {
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    cvFilePath:{
        type:String,
        required:true
    }
});
const Therapist = mongoose.model('Therapist', TherapistsSchema);
module.exports = Therapist;