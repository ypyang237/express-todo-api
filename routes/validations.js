function validation(object) {
  return function(req, res, next) {

  var pass = true;

  console.log(Object.keys(req.body));
  console.log(Object.keys(object));

  if((Object.keys(req.body)).length !== (Object.keys(object)).length) {
    pass = false;
  }

  for(var prop in req.body) {
    if(object.hasOwnProperty(prop) === false) {
      pass = false;
      break;
    }

    var inputType = 'string';

    if(isNaN(Number(req.body[prop])) === false){
      inputType = 'number';
    }

    if(req.body[prop] === 'true' || req.body[prop] === 'false') {
      inputType = 'boolean';
    }

    if(object[prop] !== inputType) {
      pass = false;
    }

  }  //end of forloop

  if (pass === true) {

    next();
  } else {
    res.send('invalid');
  }

  };

}

module.exports=validation;