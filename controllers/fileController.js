
const multer = require("multer")
const Files = require("../models/file")
const path = require("path")
const { v4: uuid4 } = require("uuid")

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName)

    }
})

let upload = multer({
    storage,
    limits: { fileSize: 1000000 * 100 }
}).single("myFile")


const uploadFiles = (req, res) => {







    // store file

    upload(req, res, async (err) => {
        if (!req.file) {
            return res.status(403).json({ message: "Please provide all the credentials", success: false })
        }

        if (err) {

            return res.status(500).json({ message: err.message, success: false })
        }





        // store to db 

        const newFile = new Files({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
        })


        const savedFile = await newFile.save();
        res.status(200).json({ message: `${process.env.APP_URL}/files/${savedFile.uuid}`, success: true })

    })




}








const renderDownloadPage = async (req, res) => {



    const { uuid } = req.params;

    if (!uuid) {
        return res.status(403).json({ message: "Invalid Credentails", success: false })
    }
    try {
        const file = await Files.findOne({ uuid })
        if (!file) {

            return res.render('download', { error: "Something Link has been expired" })


        }

        res.render('download', {
            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size,
            downloadLink: `${process.env.APP_URL}/api/files/download/${file.uuid}`
        })


    } catch (error) {
        // res.status(500).json({ message: error, success: false })
        res.render('download', { error: "Something went wrong" })
    }


}






// download file  controller  function 


const downloadFile = async (req, res) => {



    const { uuid } = req.params;


    if (!uuid) {
        res.render('download', { error: "Something went wrong" })
    }

    try {
        const file = await Files.findOne({ uuid })

        if (!file) {

            return res.render('download', { error: "Something Link has been expired" })
        }

        const filePath = `${__dirname}/../${file.path}`

        res.download(filePath)
    } catch (error) {
        res.render('download', { error: "Something went wrong" })
    }
}


const sendFiles = async (req, res) => {
    const { uuid, emailTo, emailFrom } = req.body
    if (!uuid || !emailTo || !emailFrom) {
        res.status(402).json({ message: "All fields are required", success: "false" })
    }
    try {
        // get file data from database 
        const file = await Files.findOne({ uuid })
        if (!file) {
            res.status(404).json({ message: "something went wrong", success: false })
        }

        const sendMail = require("../services/email")
        sendMail({
            from: emailFrom,
            to: emailTo,
            subject: "Fileshearo File Sharing",
            text: `${emailFrom} shared a file with you  !`,
            html: require('../services/emailTemplate')({
                emailFrom,
                downloadLink: `${process.env.APP_URL}/api/files/${file.uuid}`,
                size: ` ${parseInt(file.size / 1000)}KB`,
                expires: "24 hours"
            })
        }).then(() => {
            return res.json({ success: true, message: "Email sent successfully" })
        }).catch(err => {
            return res.status(500).json({ message: "some Error while sending email", success: false })
        })
    } catch (error) {
        res.status(500).json({ message: "something went wrong", success: false })

    }
}
module.exports = { uploadFiles, renderDownloadPage, downloadFile, sendFiles }