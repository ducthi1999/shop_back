const RequestModel = require('../../models/request')

const getAll = (req, res, next) => {
  const { userRole } = req
  if (userRole !== 'admin') {
    req.err = 'Bạn không có quyền'
    return next('last')
  }

  RequestModel.find({})
    .populate('user', 'firstName lastName _id credit')
    .then(resData => {
      if (resData) {
        res.json({
          status: true,
          message: 'Lấy requests thành công',
          requests: resData
        })
      } else {
        req.err = 'Lỗi lấy requests!'
        next('last')
      }
    })
    .catch(err => next('last'))
}

module.exports = getAll