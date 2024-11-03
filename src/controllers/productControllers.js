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
exports.updateCatgoryProduct = async (req,res)=>{
    try {
        const _id = req.params.id
        const {name, description,file, status} = req.body
        console.log(name,description,file, status)
        let image = null;
        if (req.file) {image = `${req.protocol}://localhost:3030/uploads/${req.file.filename}`;}
        const updateCatgory = await CategoryProductModel.findByIdAndUpdate(_id,
             {name:name,
                description:description,
                image: image,
                status:status
             },{
                new:true
             })
             if(updateCatgory){
                res.status(200).json({
                    status:200,
                    message:"update catgory success",
                    data:updateCatgory
                })
             }else{
                res.status(404).json({
                    status:404,
                    message:"update category fail"
                })
             }
    } catch (error) {
        res.status(500).json({status:500, message: `${error}`})
    }
}
exports.deleteCategoryProduct = async (req,res)=>{
    try {
        const _id = req.params.id
        const categoryExists = await CategoryProductModel.findById({_id:_id})
        if(categoryExists){
            const deleteCategory = await CategoryProductModel.findByIdAndDelete(_id)
            if(deleteCategory){
                res.status(200).json({status:200, message:"delete category success", data: deleteCategory})
            }else{
                res.status(404).json({status:404, message:"delete category fail"})
            }
        }
    } catch (error) {
        res.status(500).json({status:500, message:`${error}`})
    }
}
exports.getCategoryProduct = async (req,res)=>{
    try {
        const {id} = req.query
        const categoryExists = await CategoryProductModel.findOne({_id:id})
        if(categoryExists){
                res.status(200).json({status:200, message:"Get category success", data: categoryExists})
            }else{
                res.status(404).json({status:404, message:"Not found category"})
            }
    } catch (error) {
        res.status(500).json({status:500, message:`${error}`})
    }
}