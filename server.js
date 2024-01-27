const express = require("express");
const dotenv = require("dotenv").config()
const connectDB = require("./config/database")
const {errorHandler} = require('./middlewares/errorMiddleware')
const port = process.env.PORT || 3005
const cors = require ('cors')

connectDB()
const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/v1/users", require("./routes/usersRoutes"))
app.use("/api/v1/albums", require("./routes/albumsRoutes"))

app.use(errorHandler)
app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`))