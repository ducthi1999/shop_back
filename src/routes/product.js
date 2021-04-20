const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const create = require('../api/product/create')
const getAll = require('../api/product/getAll')
const getOne = require('../api/product/getOne')
const update = require('../api/product/update')
const remove = require('../api/product/delete')
const passProduct = require('../api/product/passProduct')

router.put('/:productId/pass', auth, passProduct)
router.delete('/:productId/:sellerId', auth, remove)
router.put('/:slug', auth, update)
router.get('/:slug', getOne)
router.post('/', auth, create)
router.get('/', getAll)

module.exports = router
