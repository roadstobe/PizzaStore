const {Schema, model} = require('mongoose');

const cartSchema = Schema({
    idUser: String,
    order: {
        items: [
            {
                idProduct: String,
                productType: String,
                name: String,
                value: Number,
                img: String,
                kind:String,
                count: Number
            }],
        price: {
            type: Number,
            required: true
        }
    }
})


module.exports = model('Cart', cartSchema)
