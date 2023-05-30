const validator = require('validator');
const BadRequestErr = require('../errors/BadRequestErr');

const isUrlValidation = (url) => {
  if (validator.isURL(url)) {
    return url;
  }
  throw new BadRequestErr('Неверный URL');
};

module.exports = isUrlValidation;
