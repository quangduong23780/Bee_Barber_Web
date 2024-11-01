const CategoryProduct = require("../models/categoryProduct")
const CategoryProductModel = require("../models/categoryProduct")

exports.getCategoryProduct = async (req,res)=>{

    const categories = await CategoryProductModel.find()
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
exports.addCategoryProduct = async (req,res)=>{
    try{
        const {name, description,file, status} = req.body
        console.log(name,description,file, status)
        let image = null;
        if (req.file) {image = `${req.protocol}://localhost:3030/uploads/${req.file.filename}`;}
        const newCategory = new CategoryProduct({
            name:name,
            description:description,
            image:image,
            status:status
        })
        const categoryExists = await CategoryProductModel.findOne({name:name})
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