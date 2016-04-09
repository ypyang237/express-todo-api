var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));


var JSONFile = {
  buzzwords : [],
  score: 0
};

router.route('/')
  .get(function(req, res) {
    res.send(`index`);
  });

router.route('/buzzwords')
  .get(function(req, res) {
    res
    .json(JSONFile);
  })

  .post(function(req, res) {
     req.body.heard = false;
     JSONFile.buzzwords.push(req.body);

    res.json({
      success : true
    });
     })

  .put(function(req, res) {
   JSONFile.buzzwords.forEach(function(element, index){
    if(element.buzzword === req.body.buzzword) {
      JSONFile.score += Number(element.points);
      JSONFile.buzzwords[index].heard = true;
    }
   });

    res.json({ "success": true, newScore: Number });
  })

  .delete(function(req, res) {

    JSONFile.buzzwords.forEach(function(element, index){
    if(element.buzzword === req.body.buzzword) {
      JSONFile.buzzwords.splice(index, 1);
    }
   });

    res.json({ "success": true });
  });


  router.route('/reset')
  .post(function(req, res) {
    JSONFile.score = 0;
    JSONFile.buzzwords = [];

      res.json({
      success : true
    });
  });

module.exports = router;



