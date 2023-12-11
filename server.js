const express = require("express");
const dotenv = require("dotenv").config()
const port = process.env.PORT || 3005

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`))