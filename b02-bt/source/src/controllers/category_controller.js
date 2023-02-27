const routerName = 'category'
const renderName = `backend/page/${routerName}/`

const CategoryService = require('../services/category_service')

module.exports = {
    list: async (req, res, next) => {
        let data = await CategoryService.getAll({})
        let countItems = await CategoryService.getCount()
        res.render(`${renderName}/list`, {
            items: data,
            countItems
        })
    },
    getForm: async (req, res, next) => {
        res.render(`${renderName}/form`)
    },
    createItem: async (req, res, next) => {
        let item = {
            name: req.body.name,
            ordering: Number(req.body.ordering),
            status: req.body.status
        }
        await CategoryService.createItem(item)
        res.redirect('/admin/category')
    },
    action: async (req, res, next) => {
        let countItems = await CategoryService.getCount()
        switch (req.params.action) {
            case "search":
                let keyword = req.query.keyword.toLowerCase()
                let searchedItem = await CategoryService.searchItem({ name: { $regex: keyword, $options: 'i' } })

                res.render(`${renderName}/list`, {
                    items: searchedItem,
                    countItems
                })
                break;
            case "active":
                let activeItems = await CategoryService.getActive()
                res.render(`${renderName}/list`, {
                    items: activeItems,
                    countItems
                })
                break;
            case "inactive":
                let inactiveItems = await CategoryService.getInactive()
                res.render(`${renderName}/list`, {
                    items: inactiveItems,
                    countItems
                })
                break;

            default:
                break;
        }
    }
}
