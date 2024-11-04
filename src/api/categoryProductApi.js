const express = require('express')
const categoryProduct= require('../controllers/categoryController')
const router = express.Router()
const upload = require('../../public/config/uploads')

router.get("/api/get/categories_product",categoryProduct.getAllCategoryProduct)
router.post("/api/post/add_category_product", upload.single('file'),categoryProduct.addCategoryProduct)
router.post("/api/post/update_category_product/:id",upload.single('file'), categoryProduct.updateCatgoryProduct)
router.delete("/api/delete/category_product/:id", categoryProduct.deleteCategoryProduct)
router.get("/api/get/category_product", categoryProduct.getCategoryProduct)
router.get("/api/get/categories/:id", categoryProduct.getCategoryById);
module.exports = router