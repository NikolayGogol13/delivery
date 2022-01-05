const express = require('express')
const router = express.Router()

const saveImage = require('../controllers/saveImage')
router.post('/', saveImage.upload.single('image'), saveImage.saveImage)

module.exports = router