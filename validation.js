function validations (validFields) {
  return function (req, res, next) {
    var missingKeys = validFields.filter((key) => {
      return !req.body.hasOwnProperty(key) || req.body[key].length === 0;
    })
    console.log(missingKeys);
    if (missingKeys.length !== 0) {
      return res.send(400);
    }
    return next();
  }
}
module.exports = validations;