const userRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { isUrlValidation, correctIdValidation } = require('../middlewares/validation');

const {
  getUsers,
  getUser,
  getUserById,
  patchUserInfo,
  patchUserAvatar,
} = require('../controllers/users');

userRoutes.get('/', getUsers);
userRoutes.get('/me', getUser);
userRoutes.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().custom(correctIdValidation),
    }),
  }),
  getUserById,
);

userRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), patchUserInfo);

userRoutes.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(isUrlValidation),
  }),
}), patchUserAvatar);

module.exports = userRoutes;
