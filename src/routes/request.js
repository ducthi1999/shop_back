const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const getAll = require('../api/request/getAll')
const remove = require('../api/request/delete')

router.delete('/:requestId', auth, remove)
router.get('/', auth, getAll)

module.exports = router
