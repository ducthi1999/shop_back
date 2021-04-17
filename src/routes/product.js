const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const create = require('../api/product/create')
const getAll = require('../api/product/getAll')

router.post('/', create)
router.get('/', getAll)

module.exports = router
