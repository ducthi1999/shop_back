const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)
const Schema = mongoose.Schema

const Product = new Schema({
  name: { type: String, maxLength: 255 },
  password: { type: String, required: true },
  image: { type: Object, default: { url: '/images/default_img.png' } },
  price: { type: Number, default: 0 },
  desc: { type: String, default: '' },
  seller: { type: String, ref: 'account' },
  category: { type: String, ref: 'category', default: null },
  sold: { type: Boolean, default: false },
  slug: { type: String, slug: "name" },
  passed: { type: Boolean, default: false }
}, {
  timestamps: true
})

module.exports = mongoose.model('product', Product)