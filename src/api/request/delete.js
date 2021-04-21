const RequestModel = require('../../models/request')

const remove = (req, res, next) => {
  const { userRole } = req
  const { requestId } = req.params

  if (userRole !== 'admin') {
    req.err = 'Bạn không có quyền'
    return next('last')
  }

  RequestModel.deleteOne({
    _id: requestId
  })
    .then(resData => {
      if (resData) {
        res.json({
          status: true
      })
      } else {
        req.err = 'Lỗi xóa requests!'
        next('last')
      }
    })
    .catch(err => next('last'))
}

module.exports = remove