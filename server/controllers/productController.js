const Product = require('../models/Product');

exports.editProduct= async (req, res) =>{
    const result = await Product.updateOne({_id : req.body.id}, {$set:{
            productType: req.body.typeProduct,
            productName: req.body.productName,
            price: req.body.price,
            kind: req.body.kind,
            description: req.body.description,
            img: req.body.img,
            nutrients:  req.body.nutrients

        }})

    res.end(JSON.stringify(result));
}
exports.AddProductApi = (req, res) =>{
    const product = new Product({
        productType: req.body.typeProduct,
        productName: req.body.productName,
        price: req.body.price,
        kind: req.body.kind,
        description: req.body.description,
        img: req.body.img,
        nutrients:  req.body.nutrients
    })

    product.save();
    res.end('saved');
}


exports.GetProductsAll = async (req, res)=>{

    const product = await Product.find();
    res.send(JSON.stringify(product))
}

exports.getByIds = async (req, res)=>{
    let arrProduct = [];
    let idsProducts = req.body.arrProdIds;
    for (let i = 0; i < idsProducts.length; i++){
        arrProduct.push(await Product.findById(idsProducts[i].id))
    }
    res.end(JSON.stringify(arrProduct));

}


exports.deleteByIds = async (req, res)=>{
    await Product.deleteMany(Product.findById(req.body.Id));


    res.end(JSON.stringify(true));

}




