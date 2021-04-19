const ProductModel = require('../../models/product')
const AccountProduct = require('../../models/account')

const buyProduct = (product, user) => {
  
  return ProductModel.updateOne({
    _id: product._id
  }, {
    sold: true
  })
    .then(resData => {
      console.log(resData)
      if (resData) {
        return AccountProduct.updateOne({
          _id: user._id,
        }, {
          coins: user.coins,
          $push: {
            bought: { _id: product._id }
          }
        })
      }
    })
    .then(resData => {
      if (resData) {
        return AccountProduct.updateOne({
          _id: product.seller._id
        }, {
          coins: product.seller.coins,
          $push: {
            notif: {
              content: `Nick ${product.name} đã được mua.`
            }
          }
        })
      }
    })
}

module.exports = buyProduct