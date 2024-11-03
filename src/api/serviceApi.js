const express = require("express")
const serviceController = require("../controllers/serviceController")
const router = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'uploads/' });

router.get("/api/get_all/service",serviceController.getAllService)
router.post("/api/post/add_service",upload.single('file'), serviceController.addService)
router.post("/api/update/update_service/:id", upload.single('file'), serviceController.updateCService)
router.delete("/api/delete/delete_service", serviceController.deleteService)
router.get("/api/get/service",serviceController.getService)
module.exports = router