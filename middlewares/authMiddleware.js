const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async(req,res,next)=> {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            console.log("headers before token extraction",req.headers)
            token = req.headers.authorization.split(' ')[1]
            console.log("Received token:", token)
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            console.log("decode token:", decoded)
            req.user = await User.findById(decoded.idUser).select('-password')
            console.log("req.user desde authMiddleware:", req.user)
            next()
        }catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Acceso no autorizado.')
        }
    } 
    else if(!req.headers.authorization){
        res.status(401)
        throw new Error('Acceso no autorizado, no se proporcionó ningún token.')
    } else {
        res.status(401)
        throw new Error("Acceso no autorizado, el token proporcionado es inválido.")
    }

})

module.exports = {
    protect
}