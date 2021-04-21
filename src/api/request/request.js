const RequestModel = require('../../models/request')
const AccountModel = require('../../models/account')

const request = (userId, coins, newCoins) => {
  let promises = []

  const newRequest = new RequestModel({
    user: userId,
    coins
  })

  promises.push(newRequest.save())
  promises.push(
    AccountModel.updateOne({
      _id: userId
    }, {
      coins: newCoins
    })
  )
  return Promise.all(promises)
}

module.exports = request