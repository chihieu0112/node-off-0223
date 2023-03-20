const routerName = 'category'
const renderName = `backend/page/${routerName}/`
var path = require('path');
const CategoryService = require('../services/category_service')
const CategoryModel = require('../models/category_model')
const ItemModel = require('../models/article_model')

module.exports = {
    list: async (req, res, next) => {
        let data = await CategoryService.getAll({})
        let countItems = await CategoryService.getCount()
        // let data = await tryCatch(CategoryService.getAll, {})
        // let countItems = await tryCatch(CategoryService.getCount)
        let title = 'Category'
        async function catchAsync(fn) {
            return (req, res, next) => {
                fn(req, res, next).catch(next)
            }
        }
        let routeAddNew = 'category/form'
        res.render(`${renderName}/list`, {
            items: data,
            countItems,
            routeAddNew,
            title
        })
    },
    getForm: async (req, res, next) => {
        res.render(`${renderName}/form`, {
            title: 'Category'
        })
    },
    createCategory: async (req, res, next) => {
        const { v4: uuidv4 } = require('uuid');
        const imgId = uuidv4(); 
        let item = {
            name: req.body.name,
            ordering: Number(req.body.ordering),
            status: req.body.status,
            slug: req.body.slug
        }
        await CategoryModel.create(item)
        .then(() => {
            res
                .status(200)
                .redirect('/admin/category')
        })
        .catch((err) => {
            console.log(err)
            res.status(500)
        })
        // const tempPath = req.file.path;
        // const targetPath = path.join(__dirname, `../public/img/upload/image-${imgId}.jpg`);

        // if ( path.extname(req.file.originalname).toLowerCase() === ".jpg") {
        //     fs.rename(tempPath, targetPath, err => {
        //         if (err) return handleError(err, res);

        //         res
        //             .status(200)
        //             .redirect('/admin/category')

        //     });
        // } else {
        //     fs.unlink(tempPath, err => {
        //         if (err) return handleError(err, res);

        //         res
        //             .status(403)
        //             .contentType("text/plain")
        //             .end("Only .png and .jpg files are allowed!");
        //     });
        // }
    },
    listArticle: async (req, res, next) => {
        let categoryId = req.params.categoryId
        let data = await ItemModel.find({categoryId})
        let categoryName = await CategoryModel.findOne({categoryId})
        let countItems = await getCount(ItemModel)
        let routeAddNew = `/admin/article/form/${categoryId}`
        let title = 'Article'
        res.render(`${renderName}/list`, {
            items: data,
            countItems,
            title,
            routeAddNew,
            categoryName: categoryName.name
        })
    }

    // action: async (req, res, next) => {
    //     let countItems = await CategoryService.getCount()
    //     switch (req.params.action) {
    //         case "search":
    //             let keyword = req.query.keyword.toLowerCase()
    //             let searchedItem = await CategoryService.searchItem({ name: { $regex: keyword, $options: 'i' } })

    //             res.render(`${renderName}/list`, {
    //                 items: searchedItem,
    //                 countItems,
    //                 keyword
    //             })
    //             break;
    //         case "active":
    //             let activeItems = await CategoryService.getActive()
    //             res.render(`${renderName}/list`, {
    //                 items: activeItems,
    //                 countItems
    //             })
    //             break;
    //         case "inactive":
    //             let inactiveItems = await CategoryService.getInactive()
    //             res.render(`${renderName}/list`, {
    //                 items: inactiveItems,
    //                 countItems
    //             })
    //             break;

    //         default:
    //             break;
    //     }
    // },

}

async function getCount(model) {
    let all = (await model.find({})).length
    let active = (await model.find({status: 'active'})).length
    let inactive = (await model.find({status: 'inactive'})).length
    return {
        all,
        active,
        inactive
    }
}