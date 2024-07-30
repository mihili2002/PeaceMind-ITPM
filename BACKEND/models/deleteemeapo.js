const mongoose = require('mongoose');

const delemergencySchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    age:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true 
    },
    contact:{
        type:String,
        required:true 
    },
    gender:{
        type:String,
        required:true
    },

    doctor:{
        type:String,
        required:true
    },
    currently:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    currentDate:{
        type:String,
        required:true
    }


});

module.exports = mongoose.model('deleteemergency',delemergencySchema);