const mongoose = require('mongoose');

const UserSchema=new mongoose.Schema({
    name:'String',
    email:'String',
    age:'Number',
    address:'String',
    nic:'String',
    gender:'String',
    password:'String'
})

const UserModel=mongoose.model('User',UserSchema);

module.exports = UserModel;