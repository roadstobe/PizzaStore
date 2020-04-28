const {Schema, model} = require('mongoose');

const feedbackSchema = Schema({
    idUser:String,
    name:String,
    text:String
})


module.exports = model('Feedback', feedbackSchema)
