const registerRouter = require('./register')
const loginRouter = require('./login')
const productRouter = require('./product')
const categoryRouter = require('./category')
const authRouter = require('./auth')
const profileRouter = require('./profile')
const requestRouter = require('./request')

const route = (app) => {
  app.use('/api/auth', authRouter)
  app.use('/api/register', registerRouter)
  app.use('/api/login', loginRouter)
  app.use('/api/products', productRouter)
  app.use('/api/categories', categoryRouter)
  app.use('/api/requests', requestRouter)
  app.use('/api', profileRouter)
}

module.exports = route