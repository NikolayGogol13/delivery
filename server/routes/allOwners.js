const express = require('express')
const router = express.Router()

const allOwners = require('../controllers/allOwners')

router.get('/:maxResults', allOwners.allOwners)

module.exports = router