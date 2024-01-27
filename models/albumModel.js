const mongoose = require("mongoose");

const albumSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    albumName:{
        type: String
    },
    albumYear:{
       type: String
    }
})


module.exports = mongoose.model("Album", albumSchema)