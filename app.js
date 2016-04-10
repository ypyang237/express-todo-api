var express = require('express');
var bzwords = require('./routes/bzwords.js');
var app = express();
var bodyParser = require('body-parser');
var buzzObj = require('./buzzObj')();

app.use(express.static('public'));
app.use('/buzzwords', bzwords);
app.use(bodyParser.urlencoded({extended: false}));

app.post('/reset', function(req, res) {

    buzzObj.score = 0;

    buzzObj.buzzwords = [];

    res.json({success : true});

  });



var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('SERVER STARTED AT : http://%s:%s', host, port);
});