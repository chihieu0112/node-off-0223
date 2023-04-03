const express = require('express')

const router = express.Router();

const BlogController = require('../../controllers/frontend/blog_controller')

router
    .route('/blog')
    .get(BlogController.renderBlog)

module.exports = router;