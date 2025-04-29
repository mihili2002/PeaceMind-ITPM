const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const regiSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
   
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model("Register", regiSchema);
