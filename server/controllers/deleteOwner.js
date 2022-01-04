const fb = require("../models/firebase-config")
const admin = fb.auth()

exports.deleteOwner = function (req, res) {
    admin
        .deleteUser(req.params.uid)
        .then(() => {
            res.end('Successfully deleted user: ' + req.params.uid);
        })
        .catch(err => {
            res.end(JSON.stringify(err));
        })
}