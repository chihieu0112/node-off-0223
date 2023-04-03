const express = require('express')

const router = express.Router()
const rssController = require('../../controllers/rss_controller')

router
    .route('/')
    .get(rssController.hello)
router
    .route('/:rss')
    .get(rssController.getRss)

module.exports = router;