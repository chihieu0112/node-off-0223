const express = require('express')
const router = express.Router()


router.use((req, res, next) => {
    req.app.set('layout', 'backend/index.ejs');
    next();
});

router.use('/',require('./dashboard'))
router.use('/category',require('./category'))
router.use('/article',require('./article'))
router.use('/rss',require('./rss'))

module.exports = router