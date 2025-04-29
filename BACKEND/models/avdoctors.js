const mongoose = require('mongoose');

const emergencyAvSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    status:{
        type:String,
        required:true
    }



});

module.exports = mongoose.model('avdoctoes',emergencyAvSchema);