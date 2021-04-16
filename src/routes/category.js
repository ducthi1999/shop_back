const express = require('express')
const router = express.Router()
const getAll = require('../api/category/getAll')

router.get('/', getAll)


module.exports = router