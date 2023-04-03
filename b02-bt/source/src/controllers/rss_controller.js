const routerName = 'category'
const renderName = `backend/page/${routerName}/`
var path = require('path');
const CategoryService = require('../services/category_service')
const CategoryModel = require('../models/category_model')
const ItemModel = require('../models/article_model')

const Parser = require('rss-parser')
const parser = new Parser()



module.exports = {
    hello: async (req, res, next) => {
        // let data = await parser.parseURL('https://vnexpress.net/rss/the-gioi.rss')
        // let newData = data.items.map((item) => {
        //     let content = item.content
        //     item.content = content.match(/<img([\w\W]+?)>/g)[0]
        //     return item
        // })
        res.send('newData')

    },
    getRss: async (req, res, next) => {
        
    },

}



