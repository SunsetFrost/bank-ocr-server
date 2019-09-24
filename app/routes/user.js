const router = require('koa-router')();
const User = require('../controllers/user');

router
  .get('/', User.getUsers)
  .post('/login', User.signIn)
  .get('/signOut', User.signOut)
  .post('/register', User.signUp)
  .get('/checkLogin', User.checkLogin)
  .post('/isExist', User.isUserExist);

module.exports = router;
