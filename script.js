const File = require("./models/file")
const fs = require("fs")
require("dotenv").config()
require("./config/db")()


async function fetchData() {
    console.log("inside")
    const theDayPast = new Date(new Date() - 1000 * 60 * 60 * 24)
    const files = await File.find({ createdAt: { $lt: theDayPast } })
    if (files.length) {
        for (const file of files) {
            try {
                fs.unlinkSync(file.path);
                await file.remove()
                console.log(`file deleted successfully `)
            } catch (error) {
                console.log(`error while deleting files ${error}`)
            }
        }
        console.log(`job done`)
    }
}

fetchData(process.exit())

