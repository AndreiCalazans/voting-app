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
var Poll = require('./models/Polls');
var app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect('mongodb://andrei:123456@ds137730.mlab.com:37730/voting-app');

// var newPoll = {
//   question: 'what is your favorite color',
//   options: [
//     'blue','red', 'white'
//   ],
//   createdBy: 'Andrei'
// };
// Poll(newPoll).save();



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

app.post('/createPoll' , function(req, res) {
  let newPoll = req.body;
  Poll(newPoll).save(function(err) {if(err) throw err});
  res.sendStatus(200);
});
app.get('/allPolls' , function(req, res) {
  Poll.find({} , function(err , poll) {
    if (err) throw err;
    res.send(poll);
  })
})

app.post('/signup', passport.authenticate('local-signup'),  function(req, res) {
  let infoReturned = {
    user: req.user,
    messages: req.flash('success')[0] || req.flash('error')[0]
  };
  req.session.user = req.user;
  res.send(infoReturned);
});
app.post('/signupWithFacebook', function(req, res) {
  var account = req.body.user;

  handleFacebookLogin(account);
  res.sendStatus(200);
});
app.post('/login', passport.authenticate('local-login'), function(req, res) {
  let infoReturned = {
    user: req.user,
    messages: req.flash('success')[0] || req.flash('error')[0]
  };
  req.session.user = req.user;
  res.send(infoReturned);
});

app.post('/vote', function(req, res) {
  Poll.find({question: req.body.question}, {options: { $elemMatch: {value: req.body.selected}}} , function(err , element) {
    if (err) throw err;
    let preVal = element[0].options[0].vote;
    element[0].options[0].vote = preVal + 1;
    element[0].save(function(err) {
      if ( err ) throw err;
      res.sendStatus(200);
    })
  })

})
app.post('/delete', function(req, res) {
  Poll.remove({question: req.body.question},function(err) {
    if (err) throw err;
    res.sendStatus(200);
  });
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

// this returns only one question with its data
app.get('/poll/:question', function(req, res, next) {
  Poll.find({question: req.params.question}, function(err , question) {
    if (err) throw err;
    res.send(question);
  })
});
app.get('*', function (req, res) {
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

      })
    }
  })
};
