const express = require("express")
const userController = require("../controllers/userController")
const router = express.Router()

router.post("/api/post/signin", userController.signin)
router.get("/api/get_all/user",userController.getAllUser)
router.post("api/get/user",userController.getUser)

module.exports = router