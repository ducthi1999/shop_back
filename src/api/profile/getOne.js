const AccountModel = require('../../models/account')

const getOne = (req, res, next) => {
  const { userId } = req
  const { _id, role } = req.params
  const query = {}

  if (_id && _id !== 'null') query._id = _id
  if (role && role !== 'null') query.role = role

  AccountModel.findOne(
    query
  )
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