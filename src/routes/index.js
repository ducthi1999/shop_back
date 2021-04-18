const registerRouter = require('./register')
const loginRouter = require('./login')
const productRouter = require('./product')
const categoryRouter = require('./category')
const authRouter = require('./auth')

const route = (app) => {
  app.use('/api/register', registerRouter)
  app.use('/api/login', loginRouter)
  app.use('/api/products', productRouter)
  app.use('/api/categories', categoryRouter)
  app.use('/api/auth', authRouter)
}

module.exports = route