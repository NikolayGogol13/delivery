const express = require('express')
const router = express.Router()

const deleteOwner = require('../controllers/deleteOwner')

router.delete('/:uid', deleteOwner.deleteOwner)

module.exports = router