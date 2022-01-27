const express = require('express')
const router = express.Router()

const business = require('../controllers/business')

router.get('/', business.getBusinessImage)
router.post('/',  business.upload.single('image'),  business.updateImage)
router.delete('/', business.deleteBusiness)

module.exports = router