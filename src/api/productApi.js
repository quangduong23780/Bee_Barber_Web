const express = require("express")
const productController = require("../controllers/productControllers")
const router = express.Router()

const upload = require('../../public/config/uploads')

router.get("/api/get_all/product",productController.getAllProduct)
router.post("/api/post/add_product",upload.single('file'), productController.addProduct)
router.get("/api/products/update/quantity/:id", productController.updateProduct)
router.delete("/api/delete/delete_product", productController.deleteProduct)
router.get("/api/get/product",productController.getProduct)
module.exports = router