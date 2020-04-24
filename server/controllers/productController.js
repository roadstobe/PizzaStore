const Product = require('../models/Product');


exports.AddProductApi = (req, res) =>{
    const product = new Product({
        productType: 'pizza',
        productName: 'Mashroom',
        price: [{size: 'S', value: 175},{size: 'XL', value: 240}],
        kind: 'Vegeterian',
        description: 'Some description',
        img: '',
        nutrients: ['шампынйони свіжі', "моцарела вчорашня", "шампіньони консервовані", "соус пелатті", "корж"]
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
