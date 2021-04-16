const jwt = require('jsonwebtoken')
const AccountModel = require('../../models/account')

const register = (req, res, next) => {
  const data = req.body
  console.log('manh')
  AccountModel.findOne({
    username: data.username
  })
    .then(resData => {
      if (!resData) {
        const newAccount = new AccountModel(data)
        newAccount.save(err => {
          if (err === null) {
            const { _id, username, password, role, firstName, lastName, email, coin, bought } = newAccount
            const token = jwt.sign({ _id, username, password, role }, 'mb1o4er')
            res.json({
              status: true,
              message: 'Đăng kí thành công!',
              user: {
                _id,
                username,
                role,
                firstName,
                lastName,
                email,
                coin,
                bought,
                token
              }
            })
          } else {
            req.err = 'Đăng kí thất bại!'
            next('last')
          }
        })
      } else {
        req.err = 'Tài khoản đã tồn tại!'
        next('last')
      }
    })
}

module.exports = register