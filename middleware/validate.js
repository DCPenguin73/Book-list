
const validator = require('../helpers/validate');

const saveBook = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    firstName: 'required|string',
    lastName: 'required|string',
    series: 'required|string',
    genre: 'required|string',
    pYear: 'string',
    age: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveBook
};