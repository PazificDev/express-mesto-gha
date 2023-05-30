/* eslint-disable no-else-return */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const BadRequestErr = require('../errors/BadRequestErr');
const AlreadyExistErr = require('../errors/AlreadyExistErr');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(next)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(next)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestErr('Переданы неверные данные'));
      } else {
        return next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then(() => res.status(201).send(
          {
            data: {
              name,
              about,
              avatar,
              email,
            },
          },
        ))
        .catch((err) => {
          if (err.code === 11000) {
            return next(new AlreadyExistErr('Пользователь с данным email уже существует'));
          } else if (err.name === 'ValidationError') {
            return next(new BadRequestErr('Переданы неверные данные'));
          } else {
            return next(err);
          }
        });
    })
    .catch(next);
};

const patchUserInfo = (req, res, next) => {
  const {
    name,
    about,
  } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(next)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestErr('Переданы неверные данные'));
      } else {
        return next(err);
      }
    });
};

const patchUserAvatar = (req, res, next) => {
  const {
    avatar,
  } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(next)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestErr('Переданы неверные данные'));
      } else {
        return next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  getUserById,
  createUser,
  patchUserInfo,
  patchUserAvatar,
  login,
};
