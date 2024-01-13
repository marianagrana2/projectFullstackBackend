const express = require("express")
const router = express.Router();
const {getAlbums, addAlbum, deleteAlbum} = require ("../controllers/albumsController")
const {protect} = require('../middlewares/authMiddleware')

router.post("/dashboard/albums/add/:albumName",protect, addAlbum)
router.delete("dashboard/albums/delete/:albumName",protect,deleteAlbum)
router.get("/dashboard/albums",protect, getAlbums)


module.exports = router