const { Schema , model } = require("mongoose")

const CategoryModel = new Schema({
    name : {
        type : String,
    },
    ordering: {
        type: Number
    },
    status: {
        type: String
    },
    slug: {
        type: String
    }
}, {
    timestamps : true
})

module.exports = model('categories' , CategoryModel)

// var mongoose = require('mongoose')
// const { Schema } = mongoose;

// const CategoryModel = new Schema({
//     id: String,
//     name: String,
//     done: Boolean
//     // date: { type: Date, default: Date.now },
// });

// const Item = mongoose.model('items', CategoryModel);

// module.exports = Item