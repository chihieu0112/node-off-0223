const express = require('express')

const router = express.Router()
const apiController = require('../../controllers/api_controller')

router
    .route('/changeStatus')
    .put(apiController.changeStatus)

router
    .route('/changeOrdering')
    .put(apiController.changeOrdering)

router
    .route('/removeItem')
    .delete(apiController.removeItem)

module.exports = router;