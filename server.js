var express = require('express');
var path = require('path');
var passport = require('passport');
var flash    = require('connect-flash');
// //create our app
//
var mongoose = require('mongoose');

var cookieParser = require('cookie-parser');
var bodyParser= require('body-parser');
var session = require('express-session');

var app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect('mongodb://andrei:123456@ds137730.mlab.com:37730/voting-app');

app.use(function(req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https'){
    res.redirect('http://'+ req.hostname + req.url);
  }else {
    next();
  }
});
//
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());// get information from html forms

// required for passport
app.use(session({
  secret:   'andrei',
     name: 'votingapp', // connect-mongo session store
     proxy: true,
     resave: true,
     saveUninitialized: true

 })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./configuration/passport')(passport);

app.use(express.static('public'));


app.post('/signup', passport.authenticate('local-signup'),  function(req, res) {
  let dude = req.user;
  req.session.user = dude;
  res.send(dude);
});
app.post('/signupWithFacebook', function(req, res) {
  var account = req.body.user;
  console.log(account);
  handleFacebookLogin(account);
  res.sendStatus(200);
});
app.post('/login', passport.authenticate('local-login'), function(req, res) {
  let dude = req.user;
  req.session.user = dude;
  res.send(dude);
});
app.get('/login/facebook', passport.authenticate('facebook-login'));
app.get('/auth/facebook/callback', passport.authenticate('facebook-login'), function(req, res) {
  let dude = req.user;
  req.session.user = dude;
  res.send(dude);
});
app.get('/session' , function(req, res) {
  if (req.user == undefined) {
    // console.log('no session for user');
    res.sendStatus(404);
  } else {
    res.send(req.user);
    // console.log('there is a session for this: ' , req.session.user);
  }
});

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, function(){
  console.log('server is up on port ' + PORT);
});



var User = require('./models/User');
var handleFacebookLogin = function(account) {
  User.findOne({email: account.email}, function(err, user) {
    if (err) throw err;
    if (user) {
      return console.log('account already exist');
    } else {
      var newUser = new User();
      newUser.email = account.email;
      newUser.name = account.name;
      newUser.password = null;

      newUser.save(function(err) {
        if (err) throw err;
        return console.log('New account created!');
      })
    }
  })
};
