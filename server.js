var express = require('express');
var path = require('path');
//create our app

var app = express();
const PORT = process.env.PORT || 3000;

app.use(function(req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https'){
    res.redirect('http://'+ req.hostname + req.url);
  }else {
    next();
  }
});


app.use(express.static('public'));


app.post('/signup', passport.authenticate('local-signup'),  function(req, res) {
  let dude = req.user;
  res.send(dude);
});
app.post('/login', passport.authenticate('local-login'), function(req, res) {
  let dude = req.user;
  res.send(dude);
});

app.get('/*', function (req, res) {
  if (req.user == undefined) {
    console.log('no session for user');
  } else {
    console.log('there is a session for this: ' , req.user);
  }
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, function(){
  console.log('server is up on port ' + PORT);
});


//lerning to use git revert
