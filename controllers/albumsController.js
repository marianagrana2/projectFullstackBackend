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
    const user = await User.findById(req.user._id)
    if(!req.user || !req.user._id){
        return res.status(400).json({message: "User Id is required"})
    }
    try{
    console.log("AlbumData backend body", req.body)
    console.log("albumName backend:",req.body.albumName)
    if(!req.body.albumName){
        return res.status(400).json({message: "AlbumName are required"})
    }
   
   const album = new Album({
        user: req.user._id,
        albumName:req.body.albumName,
        albumYear:req.body.albumYear
    })

        const savedAlbum = await album.save();
        res.status(201).json(savedAlbum)

        //PROBAR ESTE CODIGO
        /*const user = await User.findOneAndUpdate(
            {_id: req.user._id},
            {$push: {albums: album._id}},
            {new: true, upsert: true}
        )*/
        
        console.log(`Album guardado: ${album.albumName} Album Year: ${album.albumYear}`)
        if(user){
            user.albums.push(album._id)
            await user.save()
            
        } else {
            console.error("User not found.")
            return res.status(404).json({message: "User not found."})
        }   
        
    } catch(error){
        console.error(error)
        res.status(500).json({message: "Error al guardar el album"})
    }
    
})


//Delete Album 
const deleteAlbum = asyncHandler(async (req,res) => {
    const user = await User.findOne({email: req.user.email})
    const albumId = req.params.albumId
    const album = await Album.findById(req.params.albumId)
    console.log("req.params baackend:",req.params)
    console.log("album Id backend:",albumId)
    console.log("album valor backend:",album)
    if(!album){
        res.status(400)
        throw new Error("Album not found.")
    }
    if(album.user.toString() != req.user._id){
        res.status(401)
        throw new Error("Unauthorized access.")
    } else{
        await Album.deleteOne({_id: albumId})
        res.status(200).json({id: albumId})
    }
})

module.exports = {
    getAlbums,
    addAlbum,
    deleteAlbum
}