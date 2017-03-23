var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;




module.exports = function(passport) {

  mongoose.connect('mongodb://andrei:123456@ds137730.mlab.com:37730/voting-app');
  const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String
  });
  const User = mongoose.model('User', userSchema );

passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

  passport.use('local-signup',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    nameField: 'name',
    passReqToCallback: true
  },

    function(req , email, password, done) {
      User.findOne({email: email}, function (err, user) {
        if ( err) return done(err);
        if (user) {
          return done(null, false, console.log('account already exist'));
        } else {
          var newUser = new User();

          newUser.email = email;
          newUser.password = password;
          newUser.name = req.body.name;

          newUser.save(function(err) {
            if (err) throw err;
            return done(null , newUser);
          });
        }
      })
    }
  ));
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    },
    function(req, email, password, done) {
      User.findOne({'email': email}, function(err, user){
        if(err) return done(err);

        if (!user) {
          return done(null, false, console.log('user not found'));
        }

        if (user.password != password) {
          return done(null, false, console.log('wrong password'));
        }
        return done(null,user);
      });
    }));
  };
