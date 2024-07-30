const mongoose = require('mongoose');

const EmepreSchema = new mongoose.Schema({

    names:{
        type:String,
        required:true
    },

    doctor:{
        type:String,
        required:true
    },
    dosage:{
        type:String,
        required:true 
    },
    refills:{
        type:String,
        required:true 
    },
    instructions:{ 
        type:String,
        required:true
    },

    medicine:{
        type:String,
        required:true
    },
    
    currentDate:{
        type:String,
        required:true
    }


});

module.exports = mongoose.model('preemergency',EmepreSchema);