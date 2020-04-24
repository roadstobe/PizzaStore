const {Schema, model} = require('mongoose');

const orderSchema = Schema({
    order: {
        idUser: String,
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
        },
        date: {
            type: Date,
            default: Date.now()
        }

    }
})


module.exports = model('Order', orderSchema)
