import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


var userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  }
})


//generating a hash

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassowrd = function(password) {
  return bcrypt.comparaSync(password, this.local.password);
};

module.exports = mongoos.model('User', userSchema);
