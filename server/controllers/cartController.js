const User = require('../models/User');
const Cart = require('../models/Cart')


exports.addCartApi = async (req, res) => {

    console.log(req.body.idUser)
    let isExistCart = await Cart.find({idUser: req.body.idUser});

    if (!isExistCart) {
        const cart = new Cart({
            idUser: req.body.idUser,
            order: {
                items: req.body.product.map(el => {
                    return prod = {
                        idProduct: el.id,
                        productType: el.type,
                        name: el.name,
                        value: el.price,
                        img: '',
                        kind: el.kind,
                        count: el.count,
                    }
                }),
                price: req.body['amountPrice']
            }
        })


        cart.save(err => {
            console.log(err);
        })
    } else {
        await Cart.updateOne({idUser: req.body.idUser}, {
            $set: {
                order: {
                    items: req.body.product.map(el => {
                        return prod = {
                            idProduct: el.id,
                            productType: el.type,
                            name: el.name,
                            value: el.price,
                            img: '',
                            kind: el.kind,
                            count: el.count,
                        }
                    }),
                    price: req.body['amountPrice']
                }
            }
        });

    }


    res.end(JSON.stringify({status: "cart saved"}))
}

exports.getUserCart = async (req, res)=>{
    let isExistCart = await Cart.findOne({idUser: req.body.idUser});
    if(!isExistCart){
        res.end(JSON.stringify({status: 'empty'}))
    }else{
        res.end(JSON.stringify({status: 'exist', cart: isExistCart}))
    }
}
