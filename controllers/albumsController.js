const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Album = require("../models/albumModel")
const axios = require("axios")
//Get Albums 
const getAlbums = asyncHandler(async (req,res) => {

    const {artistName} = req.query

    if(!artistName){
        return res.redirect('/')
    }

    const API_URL = `https://www.theaudiodb.com/api/v1/json/2/discography.php?s=${artistName}`

    try{
        const response = await axios.get(API_URL)
        return res.status(200).json({albums: response.data.album})       
    } catch(error) {
        console.error(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
   
})
// Add Album
const addAlbum = asyncHandler (async (req, res) => {
    console.log("headers", req.headers)
    if(!req.user || !req.user._id){
        return res.status(400).json({message: "User Id is required"})
    }
    console.log("req.user:",req.user)
    const user = await User.findById(req.user._id)
    
    console.log(req.body)
    
   const album = new Album({
        user: req.user._id,
        albumName: req.body.albumName,
        albumYear: req.body.albumYear
    })
    try{
        await album.save()
        
        console.log(`Album guardado: ${album.albumName} Album Year: ${album.albumYear}`)
        if(user){
            user.albums.push(album._id)
            await user.save()
            
        } else {
            console.error("User not found.")
            return res.status(404).json({message: "User not found."})
        }
        res.status(200).json({message: `Album name: ${album.albumName}`});
        
    } catch(error){
        console.error(error)
        res.status(500).json({message: "Error al guardar el album"})
    }
    
})


//Delete Album 
const deleteAlbum = asyncHandler(async (req,res) => {
    const albumName = req.body.albumName;
    const user = await User.findOne({email: req.user.email})

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