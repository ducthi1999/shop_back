const AccountModel = require('../../models/account')

const getOne = (req, res, next) => {
  const { userId } = req
  const { _id } = req.params

  AccountModel.findOne({
    _id
  })
    .then(resData => {
      if(resData) {
        let official = false
  
        if (_id === userId) {
          official = true
        }
        res.json({
          status: true,
          official: official,
          userData: resData
        })
      } else {
        req.err = 'Không tìm thấy user'
        next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi lấy thông tin user'
      next('last')
    })
}

module.exports = getOne