const ProductModel = require('../../models/product')

const passProduct = (req, res, next) => {
  const { userRole } = req
  const { productId } = req.params

  if (userRole === 'admin') {
    ProductModel.updateOne({
      _id: productId
    }, { passed: true })
      .then(resData => {
        if(resData) {
          res.json({
            status: true
          })
        }
      })
      .catch(err => {
        req.err = 'Lỗi duyệt sản phẩm'
        next('last')
      })
  } else {
    req.err = 'Bạn không có quyền'
    next('last')
  }

}

module.exports = passProduct