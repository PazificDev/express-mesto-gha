const validator = require('validator');
const BadRequestErr = require('../errors/BadRequestErr');

const isUrlValidation = (url) => {
  if (validator.isURL(url)) {
    return url;
  }
  throw new BadRequestErr('Неверный URL');
};

const correctIdValidation = (id) => {
  const correctId = /[0-9a-fA-F]{24}/;
  if (correctId.test(id)) {
    return id;
  }
  throw new BadRequestErr('Неверный ID');
};

module.exports = { correctIdValidation, isUrlValidation };
