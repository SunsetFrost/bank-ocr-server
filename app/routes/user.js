const router = require('koa-router')();
const User = require('../controllers/user');

router
    .get('/', User.getUsers)
    .post('/login', User.signIn)
    .post('/register', User.signUp);

module.exports = router;