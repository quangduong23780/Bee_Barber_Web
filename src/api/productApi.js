const express = require("express")
const productController = require("../controllers/productControllers")
const router = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'uploads/' });

router.get("/api/get/product",productController.getAllProduct)
router.post("/api/post/add_product",upload.single('file'), productController.addProduct)

module.exports = router