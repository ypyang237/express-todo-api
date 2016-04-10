var express = require('express');
var router = express.Router();    // is this calling in the Router middleware...module?
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));   //what does this line mean?


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
    res.json(JSONFile);})

  .post(function(req, res) {
     req.body.heard = false;
    //if theres nothin in the array, add in the buzzword
     if(JSONFile.buzzwords.length === 0) {

       JSONFile.buzzwords.push(req.body);

       return res.json({ success: true });
     }
     // also check if its already there
     for(var i = 0; i < JSONFile.buzzwords.length; i++) {

        if(req.body.buzzword === JSONFile.buzzwords[i].buzzword) {

          return res.json({success: false});
        }

      }
      //its nonexistent
      JSONFile.buzzwords.push(req.body);

      return res.json({success: true});
  })


  .put(function(req, res) {

   for(var i = 0; i< JSONFile.buzzwords.length; i++) {

      if(JSONFile.buzzwords[i].buzzword === req.body.buzzword && req.body.heard !== "false") {

        JSONFile.score += Number(JSONFile.buzzwords[i].points);

        JSONFile.buzzwords[i].heard = true;

        return res.json({ success: true, newScore: JSONFile.score });
      }

      if(JSONFile.buzzwords[i].buzzword === req.body.buzzword && req.body.heard === "false") {

        JSONFile.buzzwords[i].heard = false;

        JSONFile.score -= Number(JSONFile.buzzwords[i].points);

      }
    }

    return res.json({success: false});

  })

  .delete(function(req, res) {

    JSONFile.buzzwords.forEach(function(element, index){

      if(element.buzzword === req.body.buzzword) {

        JSONFile.buzzwords.splice(index, 1);
      }

    });

    res.json({ success: true });

  });


router.route('/reset')

  .post(function(req, res) {

    JSONFile.score = 0;

    JSONFile.buzzwords = [];

    res.json({success : true});

  });

module.exports = router;



