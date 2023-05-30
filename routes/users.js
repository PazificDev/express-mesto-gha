const userRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUser,
  getUserById,
  patchUserInfo,
  patchUserAvatar,
} = require('../controllers/users');
const isUrlValidation = require('../middlewares/validation');

userRoutes.get('/', getUsers);
userRoutes.get('/me', getUser);
userRoutes.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required(),
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
