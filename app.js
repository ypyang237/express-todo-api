var express = require('express');
var bodyParser = require('body-parser');
var bzwords = require('./routes/bzwords.js');
var app = express();

app.use(express.static('public'));
app.use('/', bzwords);
console.log('here');
// app.get('/', function(req, res) {

//   res.send(`index`);
// });

// app.get('/buzzwords', function(req, res) {
//   res
//     .json({ buzzWords: [{
//             buzzWord: 'Linter',
//             score: 2,
//             heard: false
//             }]
//     });
// });

// app.post('/buzzwords', function(req, res) {

//   console.log(req);
//   res
//   //if successful
//     .json({ "success": true, newScore: Number });
//   //else
//     // .json({ "success": false, newScore: Number });
// });


// app.put('/buzzwords', function(req, res) {
//   res
//     .json({ "success": true, newScore: Number });
// });

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('SERVER STARTED AT : http://%s:%s', host, port);
});