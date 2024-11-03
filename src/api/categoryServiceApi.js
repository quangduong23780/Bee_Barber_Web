const express = require('express')
const categoryProduct= require('../controllers/categorySeviceController')
const router = express.Router()
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get("/api/get/category_service",categoryProduct.getAllCategory)
router.post("/api/post/add_category_service", upload.single('file'),categoryProduct.addCategory)
router.post("/api/post/update_category_service/:id",upload.single('file'), categoryProduct.updateCatgory)
router.delete("/api/delete/category_service/:id", categoryProduct.deleteCategory)
router.get("/api/get/category_service", categoryProduct.getCategory)
module.exports = router