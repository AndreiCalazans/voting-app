var express = require('express');
var path = require('path');



var app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static('public'));

app.listen(PORT, function(){
  console.log('server is up on port ' + PORT);
});
