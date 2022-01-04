const admin = require("firebase-admin")
const serviceAccount = require("../my-project-1505985398534-firebase-adminsdk-xgqio-6acdc3659c")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://my-project-1505985398534.firebaseio.com"
})
const auth = admin.auth()
exports.allOwners = function (req, res) {
    console.log(req);
    const maxResults = 1
    const users = []
    auth.listUsers(maxResults)
        .then(userRecords => {
            userRecords.users.forEach(user => {
                users.push(user.toJSON())
            })
            res.end(JSON.stringify(users));
        }).catch((error) => console.log(error));
}