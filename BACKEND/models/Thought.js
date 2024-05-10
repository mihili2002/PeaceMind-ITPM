const mongoose = require('mongoose');

const ThoughtSchema = new mongoose.Schema({
  email : 'String',
  date : 'Date',
  thought : 'String',
  reason : 'String'
});

const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;