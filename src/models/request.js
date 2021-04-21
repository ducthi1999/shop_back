const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Request = new Schema({
  user: { type: String, ref: 'account' },
  coins: { type: Number, min: 1 }
})

module.exports = mongoose.model('request', Request)