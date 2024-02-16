const express = require("express")
const router = express.Router();
const {getAlbums, addAlbum, deleteAlbum} = require ("../controllers/albumsController")
const {protect} = require('../middlewares/authMiddleware')

router.post("/add",protect,addAlbum)
router.delete("/:albumId",protect,deleteAlbum)
router.get("/",getAlbums)


module.exports = router