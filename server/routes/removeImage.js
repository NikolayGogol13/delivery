const express = require('express')
const router = express.Router()

const removeImage = require('../controllers/removeImage')
router.delete('/', removeImage.deleteBusinessImage)

module.exports = router