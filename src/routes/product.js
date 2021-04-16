const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const create = require('../api/product/create')

router.post('/', create)

module.exports = router
