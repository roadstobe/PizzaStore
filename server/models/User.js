const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    order:{
      items:[{
          type: Schema.Types.ObjectId,
          ref: 'Order',
          require:true
      }]
    },
    cart:[{
        type: Schema.Types.ObjectId,
        ref: 'Cart',
        require:true
    }],
    discount:{
      type:Number,
      default: 0
    },
    address:{
        type: String
    },
    birthday:{
        type: Date
    },
    role: {
        type: String,
        default: 'user'
    }

})


module.exports = model('User', userSchema)
