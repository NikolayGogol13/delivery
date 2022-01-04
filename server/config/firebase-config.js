const admin = require("firebase-admin")
const serviceAccount = require("../../src/firebaseConfig/my-project-1505985398534-firebase-adminsdk-xgqio-6acdc3659c")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://my-project-1505985398534.firebaseio.com"
})

module.exports = admin