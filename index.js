require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const app = express()
const PORT = process.env.PORT || 8080


require("./config/db")()


app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.set('views', path.join(__dirname, '/views'))
app.set("view engine", 'ejs')


// endpoints

app.use("/api/files", require("./routes/files"))

app.listen(PORT, () => console.log(`server started`))

