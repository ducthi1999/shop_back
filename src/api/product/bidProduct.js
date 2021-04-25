const ProductModel = require('../../models/product')

const bidProduct = (product) => {
  return ProductModel.updateOne({
    _id: product._id
  }, {
    winner: product.winner,
    winner_id: product.winner_id,
    price: product.price,
    winner_coins: product.winner_coins,
  })
}

module.exports = bidProduct