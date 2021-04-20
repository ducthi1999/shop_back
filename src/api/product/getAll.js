const ProductModel = require('../../models/product')

const getAll = (req, res, next) => {
  const { sort, category, seller, passed } = req.query
  console.log('req.query 5', req.query)
  const query = {}
  if (sort) query.sort = sort
  if (category) query.category = category
  if (seller) query.seller = seller
  if (passed === 1 || passed === '1') query.passed = true
  if (passed === 2 || passed === '2') query.passed = false
  console.log(query)
  ProductModel.find(query)
    .populate('seller', 'firstName lastName _id image role')
    .populate('category')
    .then(resData => {
      if (resData) {
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