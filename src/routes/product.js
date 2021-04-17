const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const create = require('../api/product/create')
const getAll = require('../api/product/getAll')
const getOne = require('../api/product/getOne')
const update = require('../api/product/update')

router.post('/', create)
router.put('/:slug', update)
router.get('/:slug', getOne)
router.get('/', getAll)

module.exports = router
