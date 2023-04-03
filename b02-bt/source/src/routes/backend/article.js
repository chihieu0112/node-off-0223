const express = require('express')

const router = express.Router()
const categoryController = require('../../controllers/article_controller')

router
    .route('/list')
    .get(categoryController.list)

// router
//     .route('/form/addItem')
//     .post(categoryController.uploadImage ,categoryController.createArticle)

router
    .route('/form/:action')
    .get(categoryController.getForm)

router
    .route('/form/addItem')
    .post(categoryController.uploadImage, categoryController.createArticle)

// router
//     .route('/:action')
//     .get(categoryController.action)

// router
//     .route('/changeStatus')
//     .get(categoryController.changeStatus)

module.exports = router;