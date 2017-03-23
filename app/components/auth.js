import passport from 'passport';
import mongoose from 'mongoose';


mongoose.connect('mongodb://andrei:123456@ds137730.mlab.com:37730/voting-app');
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model('User', userSchema );


passport.use('local-signup',new LocalStrategy(
  function(username, password, done) {
    User.findOne({username: username}, function (err, user) {
      if(err) { return done(err);}
      if (!user) {return done(null, false);}
      if (!user.verifyPassword(password)) { return done(null, false);}
      return done(null, user);
    })
  }
));
