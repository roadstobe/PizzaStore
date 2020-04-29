const {Schema, model} = require('mongoose');

const categorySchema = Schema({
    name: String,
})


module.exports = model('Category', categorySchema)
