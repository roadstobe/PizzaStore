const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = "mysecretka";



exports.addUserApi = (req, res)=>{

    const salt = bcrypt.genSaltSync(10);
    const userHash = bcrypt.hashSync(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password:userHash,
        address: req.body.address,
        birthday: req.body.birthday
    })
    console.log(user.password);

    user.save(err=>{
        console.log(err);
        res.end(JSON.stringify({status: 'error', err}))
    })

    res.end(JSON.stringify({status: 'success registered'}))
}

// exports.addUserApi = (req, res)=>{
//     const user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         phone: req.body.phone,
//         password: passwordHash.generate (req.body.password),
//         address: req.body.address,
//         birthday: req.body.birthday
//     })
//     console.log(passwordHash.generate (req.body.password));
//
//     user.save(err=>{
//         console.log(err);
//         res.end(JSON.stringify({status: 'error', err}))
//     })
//
//     res.end(JSON.stringify({status: 'success registered'}))
// }




exports.getOrders = async (req, res)=>{
    const arrIdOrders = await User.findById(req.body.idUser).select('order');
    const arrOrdersStr = await getOrders(arrIdOrders);

    res.send(arrOrdersStr);


}

exports.update = async (req, res)=>{


    const result = await User.updateOne({_id: req.body.data.id}, {$set:{
            name: req.body.data.name,
            email: req.body.data.email,
            phone: req.body.data.phone,
            address: req.body.data.address,
            birthday: req.body.data.birthday
    }});
    res.end(JSON.stringify(result));
}

// exports.checkUser = async (req, res)=>{
//     const user = await User.findOne({ email: req.body.email });
//     if(user){
//         if(passwordHash.verify( req.body.password , user.password)){
//
//             res.end(JSON.stringify({user}))
//         }
//     }
//     res.end('none')
// }

exports.checkUser=function(req, res){
    if (!req.body) return res.sendStatus(400);
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    User.findOne({
        email: userEmail
    }, function (err, user) {
        if (err) return console.log(err);
        if(!user){
            res.json(false);
            return;
        }
        if (bcrypt.compareSync(userPassword, user.password)) {
            const payload = {
                id: user._id,
                name: user.name,
                email: user.email
            };
            const token = jwt.sign(payload,secret);

            console.log(token);
            res.json({
                token: token
            });
        } else res.json(false);
    });
}



async function getOrders(arrIdOrders) {
    let addOrders = [];
    for (let i = 0; i < arrIdOrders['order'].items.length; i++){
        let {order} = await Order.findById(arrIdOrders['order'].items[i]);
        addOrders.push(order)
    }

    return JSON.stringify(addOrders);

}
