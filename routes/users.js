const userRoutes = require('express').Router();

const {
  getUsers,
  getUser,
  getUserById,
  patchUserInfo,
  patchUserAvatar,
} = require('../controllers/users');

userRoutes.get('/', getUsers);
userRoutes.get('/me', getUser);
userRoutes.get('/:userId', getUserById);
userRoutes.patch('/me', patchUserInfo);
userRoutes.patch('/me/avatar', patchUserAvatar);

module.exports = userRoutes;
