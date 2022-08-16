const express = require("express")
const path = require("path")
const app = express()
const cors = require("cors")


require("dotenv").config()
require("./config/db")()

const corsConfig = {
    origin: process.env.ALLOWED_CLIENTS.split(",")
}

app.use(express.json())
app.use(cors(corsConfig))
app.use(express.static('public'))
app.set('views', path.join(__dirname, '/views'))
app.set("view engine", 'ejs')


// endpoints

app.use("/api/files", require("./routes/files"))
app.listen(8080, () => console.log(`server started`))

