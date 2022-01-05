const multer = require('multer')
let dirName = 'default'
exports.saveImage = function (req, res) {
    dirName = req.body.uid
}

const storage =
    multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, `./src/assets/${dirName}/`)
        },
        filename: function (req, file, callback) {
            callback(null, file.originalname)
        }
    })

exports.upload = multer({storage: storage})
