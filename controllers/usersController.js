const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

// Registrar User
const registerUser = asyncHandler (async(req,res) => {
    const {userName, email, password} = req.body
    if(!userName || !email || !password){
        res.status(400)
        throw new Error("Faltan datos, favor de verificar")
    }

    // Verificar si el usuario existe
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error("Ese usuario ya existe.")
    }else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        //Crear user
        const user = await User.create({
            userName,
            email,
            password: hashedPassword
        })
        //Checar si se pudo crear el user
        if(user){
            res.status(201).json({
                _id: user._id,
                userName: user.userName,
                email: user.email,
                admin: user.isAdmin
            })
        } else{
            res.status(400)
            throw new Error("No se pudo guardar el usuario.")
        }
    }

    res.status(201).json({message: "Usuario creado."})
    
})

// Login User
const loginUser = asyncHandler(async (req,res)=> {
    const {email, password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("Faltan datos, favor de verificar")
    }
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        const token = generateToken(user._id);
        res.status(200).json({
            _id: user._id,
            userName: user.userName,
            email: user.email,
            admin: user.isAdmin,
            token: token,
        })
    } else {
        res.status(400)
        throw new Error("Credenciales incorrectas, favor de verificar.")
    }
})

// Mostrar data del User
const dataUser = asyncHandler (async (req, res) => {
    res.status(200).json(req.user)
    
})

// Generar Token
const generateToken = (idUser) => {
    return jwt.sign({idUser},process.env.JWT_SECRET,)
}
module.exports = {
    registerUser,
    loginUser,
    dataUser
}

