const express = require('express')
const router = express.Router()
const register = require('../api/sign/register')

router.post('/', register)


module.exports = router