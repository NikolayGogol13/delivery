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
const business = require('./routes/business')
const removeImage = require('./routes/removeImage')
app.use('/owners-list', allOwners)
app.use('/delete-owner', deleteOwner)
app.use('/save-image', saveImage)
app.use('/get-business-image', business)
app.use('/update-business-image', business)
app.use('/delete-business', business)
app.use('/remove-image', removeImage)
//
const port = process.env.VUE_APP__PORT_LISTEN

app.listen(port, () => {
    console.log('Port is: ' + port);
})