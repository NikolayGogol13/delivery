const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(bodyParser.json())
const dotenv = require('dotenv');
dotenv.config();
//
const allOwners = require('./routes/allOwners')
const deleteOwner = require('./routes/deleteOwner')
const saveImage = require('./routes/saveImage')
app.use('/owners-list', allOwners)
app.use('/delete-owner', deleteOwner)
app.use('/save-image', saveImage)
//
const port = process.env.VUE_APP__PORT_LISTEN

app.listen(port, () => {
    console.log('Port is: ' + port);
})