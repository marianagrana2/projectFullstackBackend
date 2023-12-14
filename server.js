const express = require("express");
const dotenv = require("dotenv").config()
const connectDB = require("./config/database")
const {errorHandler} = require('./middlewares/errorMiddleware')
const port = process.env.PORT || 3005

connectDB()
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/v1/users", require("./routes/usersRoutes"))

app.use(errorHandler)
app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`))