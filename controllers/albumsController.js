const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Album = require("../models/albumModel")

//Get Albums 
const getAlbums = asyncHandler(async (req,res) => {
    const albums = await Album.find({user: req.user._id})
    res.status(200).json(albums)
})

// Add Album
const addAlbum = asyncHandler (async (req, res) => {
    const albumName = req.body.albumName;
    const user = await User.findOne({email: req.user.email})

    const album = await Album.findOne({albumName: albumName}).exec()
    if(!album) {
        res.status(404).json({message: "Album not found."})
        return
    }

    user.albums.push(album._id)
    await user.save()

    res.json({message: "Album added.", user})
})


//Delete Album 
const deleteAlbum = asyncHandler(async (req,res) => {
    const albumName = req.body.albumName;
    const user = await User.findOne({email: req.user.email}).exec()

    const albumIndex = user.albums.findIndex(
        (albumId) => albumId.toString() === req.params.albumId
    )
    if(albumIndex === -1){
        res.status(404).json({message: "Album not found"})
        return
    }

    user.albums.splice(albumIndex, 1)
    await user.save()

    res.json({message: "Album deleted", user})

})

module.exports = {
    getAlbums,
    addAlbum,
    deleteAlbum
}