const express = require("express")
const router = express.Router();
const {getAlbums, addAlbum, deleteAlbum} = require ("../controllers/albumsController")
const {protect} = require('../middlewares/authMiddleware')

router.post("/add", addAlbum)
router.delete("/:albumName",protect,deleteAlbum)
router.get("/",getAlbums)


module.exports = router