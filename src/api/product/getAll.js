const ProductModel = require('../../models/product')

const getAll = (req, res, next) => {
  const { sort, category } = req.query
  const query = {}
  if (sort) query.sort = sort
  if (category) query.category = category

  ProductModel.find(query)
    .populate('seller', 'firstName lastName _id image role')
    .populate('category')
    .then(resData => {
      if (resData && resData.length > 0) {
        res.json({
          status: true,
          message: 'Lấy sản phẩm thành công!',
          products: resData
        })
      } else {
        req.err = 'Lỗi lấy sản phẩm!'
        next('last')
      }
    })
}

module.exports = getAll