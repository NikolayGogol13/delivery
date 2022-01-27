const fs = require('fs')
const multer = require('multer')

exports.getBusinessImage = function (req, res) {
    const path = `./public/save-images/${req.query.user}/${req.query.business}`
    const fileNames = []
    fs.readdir(path, (err, files) => {
        if (files) {
            files.forEach(file => {
                fileNames.push(file)
            })
        }
        res.end(JSON.stringify(fileNames))
    })
}

exports.updateImage = function (req, res) {
    const path = req.file.destination + '/' + req.file.originalname
    res.end(path)
}
const storage =
    multer.diskStorage({
        destination: function (req, file, callback) {
            const dir = `./public/save-images/${req.body.user}/${req.body.business}`
            fs.mkdirSync(dir, {recursive: true})
            callback(null, dir)
        },
        filename: function (req, file, callback) {
            callback(null, file.originalname)
        }
    })
exports.upload = multer({storage: storage})