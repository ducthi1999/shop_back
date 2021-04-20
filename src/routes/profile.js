const express = require('express')
const getOne = require('../api/profile/getOne')
const giveCoins = require('../api/profile/giveCoins')
const auth = require('../middlewares/auth')
const router = express.Router()

router.get('/:_id', getOne)
router.put('/:_id/:newCoins', auth, giveCoins)
module.exports = router