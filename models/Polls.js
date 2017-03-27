var mongoose = require('mongoose');


const pollSchema = new mongoose.Schema({
  question: String,
  options: [
    {type: String}
  ],
  createdBy: String
});


module.exports =  mongoose.model('Poll', pollSchema );
