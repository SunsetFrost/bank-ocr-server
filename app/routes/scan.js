const router = require('koa-router')();
const Scan = require('../controllers/scan');

router
    .get('/', Scan.getScans)
    .post('/', Scan.create);

module.exports = router;