var express = require('express');
var bodyParser = require('body-parser');  // maybe I don't need to require bodyParser here?
var bzwords = require('./routes/bzwords.js');
var app = express();

app.use(express.static('public'));
// WHY? what does this mean?
//use for all my files in the public directory?  WHY do I even need an index.html, which is the only thing in my public directory?

app.use('/', bzwords);   // I don't understand this line.

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('SERVER STARTED AT : http://%s:%s', host, port);
});