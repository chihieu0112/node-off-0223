const routerName = 'blog'
const renderName = `frontend/pages/${routerName}/`

const CategoryModel = require('../../models/category_model')
const ArticleModel = require('../../models/article_model')

module.exports = {
    renderBlog: async (req, res, next) => {
        let getPostLatest = await ArticleModel.find({status: 'active'}).sort({createdAt: -1})
        let postLatest = await Promise.all(
            getPostLatest.map(async (item) => {
                const category = await CategoryModel.find({_id: item.categoryId})
                return {
                    ...item._doc,
                    categoryName: category.length ? category[0].name : 'Unknown'
                }
            })
        )
        // console.log(postLatest)
        res.render('frontend/pages/blog.ejs', {
            postLatest
        })
    },
}

