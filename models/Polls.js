var mongoose = require('mongoose');


const pollSchema = new mongoose.Schema({
  question: String,
  name: String,
  options: [
  { value: {type: String} , vote:{type:Number}}
  ],
  createdBy: String
});


module.exports =  mongoose.model('Poll', pollSchema );
