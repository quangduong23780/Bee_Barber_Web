const CategoryProduct = require("../models/categoryProduct")
const CategoryProductModel = require("../models/categoryProduct")

exports.getAllCategoryProduct = async (req,res)=>{

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
        const {name, description} = req.body
        console.log(name,description)
        let image = null;
        if (req.file) {image = `${req.protocol}://localhost:3030/uploads/${req.file.filename}`;}
        const newCategory = new CategoryProduct({
            name:name,
            description:description,
            image:image,
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
        const updateCatgory = await CategoryProductModel.findByIdAndUpdate(_id,
             {
                status: false
             },{
                new:true
             })
             if(updateCatgory){
                res.status(200).json({
                    status:200,
                    message:"update category success",
                    data:updateCatgory
                })
             }else{
                res.status(400).json({
                    status:400,
                    message:"update category failed"
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
exports.getCategoryById = async (req, res) => {
    const categoryId = req.params.id;
  
    try {
      const category = await CategoryProductModel.findById(categoryId);
      if (category) {
        res.status(200).json({
          status: 200,
          category: category,
        });
      } else {
        res.status(404).json({ status: 404, message: "Không tìm thấy thể loại" });
      }
    } catch (error) {
      res.status(400).json({ status: 400, message: error.message });
    }
  };