const Category = require("../models/category")
const CategoryModel = require("../models/category")

exports.getAllCategory = async (req,res)=>{

    const categories = await CategoryModel.find()
    if(categories){
        res.status(200).json({
            status:200,
            message:"get categories success",
            data: categories
        })
    }else{
        res.status(404).json({
            status:404,
            message:"Not found category",
            data:[]
        })
    }
}
exports.addCategory= async (req,res)=>{
    try{
        const {name, description} = req.body
        let image = null;
        if (req.file) {image = `${req.protocol}://localhost:3030/uploads/${req.file.filename}`;}
        const newCategory = new Category({
            name:name,
            description:description,
            image:image,
        })
        const categoryExists = await CategoryModel.findOne({name:name})
        if(categoryExists){
           res.status(404).json({status:404, message:"category already exists"})
        }else{
            const addCategory = await newCategory.save()
            if(addCategory){
                res.status(201).json({status:201, message:"add category success", data:addCategory})
            }else{
                res.status(404).json({status:404, message:"add category fail"})
            }
        }
    }catch(error){
        res.status(500).json({status:500, message:`${error}`})
    }
}
exports.updateCatgory = async (req,res)=>{
    try {
        const _id = req.params.id
        const {name, description} = req.body
        let image = null;
        if (req.file) {image = `${req.protocol}://localhost:3030/uploads/${req.file.filename}`;}
        const updateCatgory = await CategoryModel.findByIdAndUpdate(_id,
             {name:name,
                description:description,
                image: image,
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
exports.deleteCategory = async (req,res)=>{
    try {
        const _id = req.query.id
        const categoryExists = await CategoryModel.findById({_id:_id})
        if(categoryExists){
            const deleteCategory = await CategoryModel.findByIdAndDelete(_id)
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
exports.getCategory = async (req,res)=>{
    try {
        const {id} = req.query.id
        const categoryExists = await CategoryModel.findOne({_id:id})
        if(categoryExists){
                res.status(200).json({status:200, message:"Get category success", data: categoryExists})
            }else{
                res.status(404).json({status:404, message:"Not found category"})
            }
    } catch (error) {
        res.status(500).json({status:500, message:`${error}`})
    }
}