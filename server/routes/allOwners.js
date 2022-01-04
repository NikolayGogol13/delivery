const express = require('express')
const router = express.Router()

const allOwners = require('../controllers/allOwners')

router.get('/', allOwners.allOwners)

module.exports = router