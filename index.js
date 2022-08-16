const express = require("express")
const path = require("path")
const app = express()
const cors = require("cors")



require("dotenv").config()
require("./config/db")()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.set('views', path.join(__dirname, '/views'))
app.set("view engine", 'ejs')


// endpoints

app.use("/api/files", require("./routes/files"))

app.listen(8080, () => console.log(`server started`))

