const multer = require('multer')
const fs = require('fs')
let dirName = 'default'
exports.saveImage = async function (req, res) {
    dirName = await req.body.uid
    console.log(req.file);
    res.end(req.file.path)
}

const storage =
    multer.diskStorage({
        destination: function (req, file, callback) {
            const dir = `./public/save-images/${dirName}/`
            fs.mkdirSync(dir, {recursive: true})
            callback(null, dir)
        },
        filename: function (req, file, callback) {
            callback(null, file.originalname)
        }
    })

exports.upload = multer({storage: storage})
