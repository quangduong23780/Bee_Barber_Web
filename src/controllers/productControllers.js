const Product = require("../models/product")
const ProductModel = require("../models/product")

exports.getAllProduct = async (req,res)=>{
    const products = await ProductModel.find()
    if(products){
        res.status(200).json({status:200, message:"Get all products success", data:products})
    }else{
        res.status(404).json({status:404, message:"Get all products fail"})
    }
}
exports.addProduct = async (req,res)=>{
    try{
        const {categoryId,name,import_price,price_selling,description,status} = req.body
        let image = null;
        if (req.file) {image = `${req.protocol}://localhost:3030/uploads/${req.file.filename}`;}
        const newProduct = new Product({
            categoryId:categoryId,
            name:name,
            imageUrl:image,
            import_price:import_price,
            price_selling:price_selling,
            description:description,
            status:status
        })
        const productExists = await ProductModel.findOne({name:name})
        if(productExists){
           res.status(404).json({status:404, message:"product already exists"})
        }else{
            const addProduct = await newProduct.save()
            if(addProduct){
                res.status(201).json({status:201, message:"add product success", data:addProduct})
            }else{
                res.status(404).json({status:404, message:"add product fail"})
            }
        }
    }catch(error){
        res.status(500).json({status:500, message:`${error}`})
    }
}
exports.updateProduct = async (req,res)=>{
    try {
        const _id = req.params.id
        const {categoryId,name,import_price,price_selling,description,status} = req.body
        let image = null;
        if (req.file) {image = `${req.protocol}://localhost:3030/uploads/${req.file.filename}`;}
        const updateProduct = await ProductModel.findByIdAndUpdate(_id,{
            categoryId:categoryId,
            name:name,
            imageUrl:image,
            import_price:import_price,
            price_selling:price_selling,
            description:description,
            status:status
             },{
                new:true
             })
             if(updateProduct){
                res.status(200).json({
                    status:200,
                    message:"update product success",
                    data:updateProduct
                })
             }else{
                res.status(404).json({
                    status:404,
                    message:"update product fail"
                })
             }
    } catch (error) {
        res.status(500).json({status:500, message: `${error}`})
    }
}
exports.deleteProduct = async (req,res)=>{
    try {
        const _id = req.query.id
        const productExists = await ProductModel.findById({_id:_id})
        if(productExists){
            const deleteProduct = await ProductModel.findByIdAndDelete(_id)
            if(deleteProduct){
                res.status(200).json({status:200, message:"delete product success", data: deleteProduct})
            }else{
                res.status(404).json({status:404, message:"delete product fail"})
            }
        }
    } catch (error) {
        res.status(500).json({status:500, message:`${error}`})
    }
}
exports.getProduct = async (req,res)=>{
    try {
        const _id = req.query.id
        const productExists = await ProductModel.findOne({_id:_id})
        if(productExists){
                res.status(200).json({status:200, message:"Get product success", data: productExists})
            }else{
                res.status(404).json({status:404, message:"Not found product"})
            }
    } catch (error) {
        res.status(500).json({status:500, message:`${error}`})
    }
}