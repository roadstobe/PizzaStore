const Category = require('../models/Category')
const Product = require('../models/Product')


exports.addCategory = async (req, res) => {
    console.log(req.body.name)
    const category =  new Category({
        name: req.body.name
    })
    console.log(category)
    category.save(err=>{
        if(err){
            res.end(JSON.stringify({status:'error'}))
            return;
        }
        res.end(JSON.stringify({status:'added'}))
    })

}

exports.getCategory = async (req, res)=>{
    const category = await Category.find();

    res.end(JSON.stringify({category}))
}

exports.delete = async (req, res)=>{
    const result = await Category.deleteOne({_id:req.body.id});

    res.end(JSON.stringify({result}))
}

exports.deleteByCategory = async (req, res)=>{
    const result = await Product.deleteMany({kind:req.body.categoryName})
    console.log(result)
    res.end(JSON.stringify({result}))
}
