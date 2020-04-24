const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product')

const passwordHash = require ('password-hash');


exports.addUserApi = (req, res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: passwordHash.generate (req.body.password),
        address: req.body.address,
        birthday: req.body.birthday
    })
    console.log(passwordHash.generate (req.body.password));

    user.save(err=>{
        console.log(err);
        res.end(JSON.stringify({status: 'error', err}))
    })

    res.end(JSON.stringify({status: 'success registered'}))
}


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

exports.checkUser = async (req, res)=>{
    const user = await User.findOne({ email: req.body.email, password:req.body.password});

    if(user){
        res.end(JSON.stringify({user}))
    }
    res.end('none')
}



async function getOrders(arrIdOrders) {
    let addOrders = [];
    for (let i = 0; i < arrIdOrders['order'].items.length; i++){
        let {order} = await Order.findById(arrIdOrders['order'].items[i]);
        addOrders.push(order)
    }

    return JSON.stringify(addOrders);

}
