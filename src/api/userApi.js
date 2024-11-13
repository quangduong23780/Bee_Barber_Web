const express = require("express")
const userController = require("../controllers/userController")
const router = express.Router()

router.post("/api/post/sign_in", userController.signin)
router.get("/api/get_all/user",userController.getAllUser)
router.post("api/get/user",userController.getUser)
router.post("/api/post/sign_up",userController.SigupUser)
module.exports = router