const AccountModel = require('../../models/account')

const giveCoins = (req, res, next) => {
  const { userRole } = req
  const { _id, newCoins } = req.params
  
  if (userRole !== 'admin') {
    req.err = 'Bạn không có quyền'
    return next('last')
  }

  AccountModel.updateOne({
    _id
  }, {
    coins: newCoins
  })
    .then(resData => {
      if (resData) {
        res.json({
          status: true,
          message: 'Chuyển xu thành công'
        })
      } else {
        req.err = 'Lỗi chuyển xu'
        next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi chuyển xu'
      next('last')
    })
}

module.exports = giveCoins