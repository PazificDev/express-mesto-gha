const userRoutes = require('express').Router();
const { joiUserById, joiPatchUserInfo, joiPatchUserAvatar } = require('../middlewares/validation');

const {
  getUsers,
  getUser,
  getUserById,
  patchUserInfo,
  patchUserAvatar,
} = require('../controllers/users');

userRoutes.get('/', getUsers);

userRoutes.get('/me', getUser);

userRoutes.get('/:userId', joiUserById, getUserById);

userRoutes.patch('/me', joiPatchUserInfo, patchUserInfo);

userRoutes.patch('/me/avatar', joiPatchUserAvatar, patchUserAvatar);

module.exports = userRoutes;
