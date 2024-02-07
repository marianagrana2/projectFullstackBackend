const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userName: {
        type:String,
        required: [true, "Por favor ingresa tu nombre."]
    },
    email: {
        type:String,
        required: [true, "Por favor ingresa tu email."],
        unique: true
    },
    password:{
        type:String,
        required: [true, "Por favor ingresa tu contraseña."]
    },
    albums: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Album'
        }
    ],
    isAdmin:{
        type:Boolean,
        default: false
    },
    isActive:{
        type:Boolean,
        default: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema) 