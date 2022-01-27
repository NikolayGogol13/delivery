const path = require('path')
const fs = require('fs');
exports.deleteBusinessImage = function (req, res) {
    const pathDir = `./public/save-images/${req.query.user}/${req.query.business}/${path.basename(req.query.key)}`
    fs.stat(pathDir, function (err, stats) {
        console.log(stats);
        if (err) throw err
        fs.unlink(pathDir, function (e) {
            if (e) throw e
            res.end('deleted')
        })
    })
}