var express = require('express');
var path = require('path');
var passport = require('passport');
var flash    = require('connect-flash');
// //create our app
//

var cookieParser = require('cookie-parser');
var bodyParser= require('body-parser');
var session = require('express-session')




// mongoose.connect('mongodb://andrei:123456@ds137730.mlab.com:37730/voting-app');
//
// const userSchema = new mongoose.Schema({
//   email: String,
//   password: String,
//   name: String
// });
//
// const User = mongoose.model('User' , userSchema);
// var firstOne = {
//   email: 'dre@yahoo.com',
//   password: '123',
//   name: 'dre'
// };
//
// User(firstOne).save();


var app = express();
const PORT = process.env.PORT || 3000;

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
  res.send('good you are signUp');
});
app.post('/login', passport.authenticate('local-login'), function(req, res) {
  res.send('Good you are logged in');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(PORT, function(){
  console.log('server is up on port ' + PORT);
});


//lerning to use git revert
