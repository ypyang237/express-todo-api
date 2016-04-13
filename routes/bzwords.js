var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var buzzObj = require('../buzzObj')();
var validation = require('./validations.js');


router.use(bodyParser.urlencoded({extended: true}));



router.route('/')
  .get(function(req, res) {
    res.json(buzzObj);

  })
  .post(validation({'buzzword': 'string', 'points': 'number'}), function(req, res) {
    //if theres nothin in the array, add in the buzzword

            var newBuzzword = {
              heard: false,
              buzzword: req.body.buzzword,
              points: req.body.points
            };

           if(buzzObj.buzzwords.length === 0) {
             buzzObj.buzzwords.push(newBuzzword);
             return res.json({ success: true });
           }
           // also check if its already there
           for(var i = 0; i < buzzObj.buzzwords.length; i++) {

              if(newBuzzword.buzzword === buzzObj.buzzwords[i].buzzword) {
                return res.json({success: false});
              }

            }
            //its nonexistent
            buzzObj.buzzwords.push(newBuzzword);

            return res.json({success: true});

  })


  .put(validation({'buzzword': 'string', 'heard': 'boolean'}), function(req, res) {

   for(var i = 0; i< buzzObj.buzzwords.length; i++) {

      if(buzzObj.buzzwords[i].buzzword === req.body.buzzword && req.body.heard !== "false") {

        buzzObj.score += Number(buzzObj.buzzwords[i].points);

        buzzObj.buzzwords[i].heard = true;

        return res.json({ success: true, newScore: buzzObj.score });
      }

      if(buzzObj.buzzwords[i].buzzword === req.body.buzzword && req.body.heard === "false") {

        buzzObj.buzzwords[i].heard = false;

        buzzObj.score -= Number(buzzObj.buzzwords[i].points);

        return res.json({ success: true, "This word remains unheard": true });

      }
    }

    return res.json({success: false});

  })

  .delete(validation({ "buzzword": 'string' }), function(req, res) {

    buzzObj.buzzwords.forEach(function(element, index){

      if(element.buzzword === req.body.buzzword) {
        buzzObj.buzzwords.splice(index, 1);
      }


    });

    res.json({ success: true });

  });







module.exports = router;



