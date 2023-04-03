const express = require('express')
const router = express.Router();

router.use((req, res, next) => {
    req.app.set('layout', 'frontend/index.ejs');
    next();
});

router.use('/' , require('./blog'))

module.exports = router