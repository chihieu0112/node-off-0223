const express = require('express')

const router = express.Router()
const categoryController = require('../../controllers/category_controller')


router
    .route('/')
    .get(categoryController.list)

router
    .route('/status/:status')
    .get(categoryController.listArticle)

router
    .route('/form')
    .get(categoryController.getForm)

router
    .route('/form/addItem')
    .post(categoryController.createCategory)

router
    .route('/:categoryId')
    .get(categoryController.listArticle)

// router
//     .route('/changeStatus')
//     .get(categoryController.changeStatus)

module.exports = router;