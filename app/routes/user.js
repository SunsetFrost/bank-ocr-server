const router = require('koa-router')();
const User = require('../controllers/user');

router.get('/', User.getUsers);
router.post('/login', User.signIn);

module.exports = router;