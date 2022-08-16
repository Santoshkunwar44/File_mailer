const { uploadFiles, downloadFile, renderDownloadPage, sendFiles } = require("../controllers/fileController")
const router = require("express").Router()

router.post("/", uploadFiles)
router.get("/:uuid", renderDownloadPage)
router.get("/download/:uuid", downloadFile)
router.post("/send", sendFiles)


module.exports = router