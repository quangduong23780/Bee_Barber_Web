const express = require("express")
const productController = require("../controllers/productControllers")
const router = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'uploads/' });

router.get("/api/get_all/product",productController.getAllProduct)
router.post("/api/post/add_product",upload.single('file'), productController.addProduct)
router.post("/api/update/update_product/:id", upload.single('file'), productController.updateProduct)
router.delete("/api/delete/delete_product", productController.deleteProduct)
router.get("/api/get/product",productController.getProduct)
module.exports = router