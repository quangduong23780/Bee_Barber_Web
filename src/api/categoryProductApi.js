const express = require('express')
const categoryProduct= require('../controllers/categoryController')
const router = express.Router()
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get("/api/get/category_product",categoryProduct.getCategoryProduct)
router.post("/api/post/add_category_product", upload.single('file'),categoryProduct.addCategoryProduct)
router.post("/api/post/update_category_product/:id",upload.single('file'), categoryProduct.updateCatgoryProduct)
router.delete("/api/delete/category_product/:id", categoryProduct.deleteCategoryProduct)
router.get("/api/get/category_product", categoryProduct.getCategoryProduct)
module.exports = router