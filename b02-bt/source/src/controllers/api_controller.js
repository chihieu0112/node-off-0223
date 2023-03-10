const routerName = 'category'
const renderName = `backend/page/${routerName}/`

const CategoryService = require('../services/category_service')
const CategoryModel = require('../models/category_model')
const ArticleModel = require('../models/article_model')

async function dbChangeStatus(model, data, res) {
    let id = data.id
    let status = data.status
    await model.findByIdAndUpdate(id, {status})
            .then(() => res.sendStatus(200))
            .catch((err) => {
                console.log(err)
                res.sendStatus(400)
            })
}

async function dbChangeOrdering(model, data, res) {
    let id = data.id
    let ordering = data.ordering
    await model.findByIdAndUpdate(id, {ordering})
            .then((rs) => {
                res.sendStatus(200)
            })
            .catch((err) => {
                console.log(err)
                res.sendStatus(400)
            })
}

async function dbRemoveItem(model, data, res) {
    let id = data.id
    await model.findByIdAndRemove(id)
            .then(() => res.sendStatus(200))
            .catch((err) => {
                console.log(err)
                res.sendStatus(400)
            })
}

module.exports = {
    changeStatus: async (req, res, next) => {
        let data = {
            id : req.body.id || false,
            status : req.body.newStatus || false
        }
        if (req.body.title === 'Article') {
            await dbChangeStatus(ArticleModel, data, res)
        } else if (req.body.title === 'Category') {
            await dbChangeStatus(CategoryModel, data, res)
        }
        
    },
    removeItem: async (req, res, next) => {
        let data = {
            id: req.body.id
        }
        if (req.body.title === 'Article') {
            await dbRemoveItem(ArticleModel, data, res)
        } else if (req.body.title === 'Category') {
            await dbRemoveItem(CategoryModel, data, res)
        }
    },
    changeOrdering: async (req, res, next) => {
        let data = {
            id : req.body.id,
            ordering : Number(req.body.newOrdering)
        }
        if (req.body.title === 'Article') {
            await dbChangeOrdering(ArticleModel, data, res)
        } else if (req.body.title === 'Category') {
            await dbChangeOrdering(CategoryModel, data, res)
        }
        
    }
}
