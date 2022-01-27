const multer = require('multer')
const fs = require('fs')
exports.saveImage = function (req, res) {
    const path  = req.file.destination + '/' + req.file.originalname
    res.end(path)
}

const storage =
    multer.diskStorage({
        destination: function (req, file, callback) {
            const dir = `./public/save-images/${req.body.uid}/${req.body.businessID}`
            fs.mkdirSync(dir, {recursive: true})
            callback(null, dir)
        },
        filename: function (req, file, callback) {
            callback(null, file.originalname)
        }
    })

exports.upload = multer({storage: storage})
