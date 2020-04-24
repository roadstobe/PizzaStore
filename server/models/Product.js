const {Schema, model} = require('mongoose');

const productSchema = Schema({
    productType: {
        type: String,
        required: true,
        default: 'pizza'
    },
    productName: {
        type: String,
        required: true
    },
    price: [{
        size: String,
        value: Number
    }],
    kind: {
        type: String,
        required: true,
        default: 'meat'
    },
    description: {
        type: String
    },
    img: {
        type: String
    },
    nutrients: [{
        type: String
    }]


})


module.exports = model('Product', productSchema)
