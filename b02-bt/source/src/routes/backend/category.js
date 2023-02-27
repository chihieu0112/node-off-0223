const express = require('express')

const router = express.Router()
const categoryController = require('../../controllers/category_controller')

router
    .route('/')
    .get(categoryController.list)

router
    .route('/form')
    .get(categoryController.getForm)

router
    .route('/form/addItem')
    .post(categoryController.createItem)

router
    .route('/:action')
    .get(categoryController.action)

module.exports = router;