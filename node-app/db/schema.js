var mongoose = require('mongoose')
const { Schema } = mongoose;

const itemSchema = new Schema({
    id: String,
    name: String,
    done: Boolean
    // date: { type: Date, default: Date.now },
});

const Item = mongoose.model('items', itemSchema);

module.exports = Item