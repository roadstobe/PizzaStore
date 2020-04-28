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
            default: new Date().setMilliseconds(3 * 60 * 60 * 1000)
        }

    }
})


module.exports = model('Order', orderSchema)
