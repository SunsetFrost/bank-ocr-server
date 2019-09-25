const router = require('koa-router')();
const Card = require('../controllers/card');

router
  .get('/', Card.getCards)
  .get('/queryByNumber', Card.getCardsByNumber)
  .post('/', Card.create)
  .post('/:card_id/', Card.updateOne);

module.exports = router;
