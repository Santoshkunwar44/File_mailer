const mongoose = require("mongoose")

const connectDb = async () => {
    console.log(process.env.MONGO_CONNECTION_URL)
    try {

        const connect = await mongoose.connect(process.env.MONGO_CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        const data = connect.connection.host;
        console.log(`connected to db ${data}`)
    } catch (err) {
        console.log(err)
        process.exit(1)



    }



}

module.exports = connectDb
