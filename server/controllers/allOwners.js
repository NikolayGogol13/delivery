const fb = require("../config/firebase-config")
const admin = fb.auth()
exports.allOwners = function (req, res) {
    const users = []
    admin.listUsers(+req.params.maxResults)
        .then(userRecords => {
            userRecords.users.forEach(user => {
                users.push(user.toJSON())
            })
            res.end(JSON.stringify(users));
        }).catch((error) => console.log(error));
}