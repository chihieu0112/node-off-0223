const CategoryModel = require('../models/category_model')
module.exports = {
    getAll : async (params) => {
       let data =  await CategoryModel.find({})
       return data
    },
    getActive : async () => {
       let data =  await CategoryModel.find({status: 'active'})
       return data
    },
    getInactive : async (params) => {
       let data =  await CategoryModel.find({status: 'inactive'})
       return data
    },
    getCount : async () => {
        let all = (await CategoryModel.find({})).length
        let active = (await CategoryModel.find({status: 'active'})).length
        let inactive = (await CategoryModel.find({status: 'inactive'})).length
        return {
            all,
            active,
            inactive
        }
    },
    createItem : async (params) => {
       await CategoryModel.create(params)
    },
    searchItem : async (params) => {
       return await CategoryModel.find(params)
    },
}