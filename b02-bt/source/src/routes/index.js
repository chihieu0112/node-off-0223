var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/' , require('./frontend'))
router.use('/admin' , require('./backend'))
router.use('/api' , require('./api/api'))

module.exports = router;