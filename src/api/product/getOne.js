const ProductModel = require('../../models/product')

const getOne = (req, res, next) => {
  const slug = req.params.slug

  ProductModel.findOne({ slug })
      .populate('category')
      .populate('seller', 'firstName lastName _id image role')
      .then(resData => {
          if (resData) {
              res.json({
                  status: true,
                  product: resData
              })
          } else {
              req.err = 'Không tìm thấy sản phẩm!'
              next('last')
          }
      })
}

module.exports = getOne