const express = require("express")
const router = express.Router();
const {registerUser,loginUser, dataUser} = require("../controllers/usersController")
const {protect} = require('../middlewares/authMiddleware')

router.post("/",registerUser)
router.post("/login",loginUser)
router.get("/data",protect, dataUser)



module.exports = router