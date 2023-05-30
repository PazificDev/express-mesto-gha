const router = require('express').Router();

const cardsRouter = require('./cards');
const usersRouter = require('./users');

const NotFoundErr = require('../errors/NotFoundErr');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use((req, res, next) => {
  next(new NotFoundErr('Страница не найдена'));
});

module.exports = router;
