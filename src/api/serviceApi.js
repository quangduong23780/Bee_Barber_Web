const express = require("express")
const serviceController = require("../controllers/serviceController")
const router = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'uploads/' });

router.get("/api/get/service",serviceController.getAllService)
router.post("/api/post/add_service",upload.single('file'), serviceController.addService)

module.exports = router