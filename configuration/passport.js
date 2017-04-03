var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
//
var User = require('../models/User');

module.exports = function(passport) {

  // mongoose.connect('mongodb://andrei:123456@ds137730.mlab.com:37730/voting-app');


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
          return done(null, false);
        } else {
          var newUser = new User();

          newUser.email = email;
          newUser.password = password;
          newUser.name = req.body.name;

          newUser.save(function(err) {
            if (err) throw err;
            return done(null , newUser , req.flash('success', 'new user was created!'));
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
          return done(null, false);
        }

        if (user.password != password) {
          return done(null, false);
        }
        return done(null,user, req.flash('success' , 'Welcome, you are logged in!'));
      });
    }));

  //   passport.use('facebook-login',new FacebookStrategy({
  //     clientID: '1087835221322773',
  //     clientSecret: '6e42b05101d7d93db8ed08b00d59f95f',
  //     callbackURL: "http://localhost:3000/auth/facebook/callback",
  //     profileFields: ['name','email']
  //   },
  //   function(accessToken, refreshToken, profile, cb) {
  //       User.findOne({'email': profile.email}, function(err , user) {
  //         if ( err ) return done(err);
  //
  //         if (user) {
  //           return done(null, user);
  //         } else {
  //           var newUser = new User();
  //           newUser.name = profile.name;
  //           newUser.email = profile.email;
  //           newUser.password = null;
  //
  //           newUser.save(function(err) {
  //             if (err) throw err;
  //             return done(null, newUser, req.flash('success', 'welcome, you are logged in!'));
  //           });
  //         }
  //       })
  //     }
  // ));


  };
