const userRoutes = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
  patchUserInfo,
  patchUserAvatar,
} = require('../controllers/users');

userRoutes.get('/', getUsers);
userRoutes.get('/:userId', getUserById);
userRoutes.post('/', createUser);
userRoutes.patch('/me', patchUserInfo);
userRoutes.patch('/me/avatar', patchUserAvatar);

module.exports = userRoutes;
