const express = require('express')
const editAvt = require('../api/profile/editAvt')
const editInfo = require('../api/profile/editInfo')
const getOne = require('../api/profile/getOne')
const giveCoins = require('../api/profile/giveCoins')
const auth = require('../middlewares/auth')
const router = express.Router()

router.put('/:_id/avt', auth, editAvt)
router.put('/:_id/:newCoins', auth, giveCoins)
router.put('/:_id', auth, editInfo)
router.get('/:_id', getOne)
module.exports = router