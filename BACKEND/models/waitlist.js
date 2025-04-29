const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const waitlistSchema = new Schema({

    name:{
        type : String,
        required: true

    },

    address :{
        type : String,
        required: true
    },

    email:{
        type : String,
        required: true
    },

    contact_number:{
        type : Number,
        required: true
    },

    Preferred_Doctor:{
        type : String,
        required: true

    },

    waitlistDate:{
        type : Date,
        required: true
    },

    Session_Time:{
        type: String,
        required:true
    }

})

const Waitlist = mongoose.model("Waitlist",waitlistSchema);

module.exports = Waitlist;