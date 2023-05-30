const cardRoutes = require('express').Router();
const { joiCreateCard, joiDeleteCard, joiCardId } = require('../middlewares/validation');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRoutes.get('/', getCards);

cardRoutes.post('/', joiCreateCard, createCard);

cardRoutes.delete('/:cardId', joiDeleteCard, deleteCard);

cardRoutes.put('/:cardId/likes', joiCardId, likeCard);

cardRoutes.delete('/:cardId/likes', joiCardId, dislikeCard);

module.exports = cardRoutes;
