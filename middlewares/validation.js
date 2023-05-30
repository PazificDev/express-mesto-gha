const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
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

const joiCreateUser = () => {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(isUrlValidation),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  });
};

const joiLoginUser = () => {
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  });
};

const joiUserById = () => {
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().custom(correctIdValidation),
    }),
  });
};

const joiPatchUserInfo = () => {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  });
};

const joiPatchUserAvatar = () => {
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(isUrlValidation),
    }),
  });
};

const joiCreateCard = () => {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(isUrlValidation),
    }),
  });
};

const joiDeleteCard = () => {
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().custom(correctIdValidation),
    }),
  });
};

const joiCardId = () => {
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().custom(correctIdValidation),
    }),
  });
};

module.exports = {
  correctIdValidation,
  isUrlValidation,
  joiUserById,
  joiPatchUserInfo,
  joiPatchUserAvatar,
  joiCreateCard,
  joiDeleteCard,
  joiCardId,
  joiCreateUser,
  joiLoginUser,
};
