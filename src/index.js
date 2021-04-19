const express = require('express')
const app = express()
const http = require('http').Server(app)
const PORT = process.env.PORT || 3999

const db = require('./db')
const route = require('./routes')
const middleware = require('./middlewares')
const errHandle = require('./middlewares/errHandle')
const buyProduct = require('./api/product/buyProduct')

db.connect()
middleware(app)
route(app)
app.use(errHandle)

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
  }
})

app.get('/', (req, res) => {
  res.send('hello')
})

io.on('connection', socket => {
  console.log('An user has connect!!!', socket.id)
  socket.on('join', ({ rooms }) => {
    socket.join(rooms)
  })

  socket.on('buy-product', ({ product, user }) => {
    buyProduct(product, user)
      .then(response => {
        if (response) {
          io.to(product._id).emit('buy-product-notif', { content: `Nick ${product.name} đã được mua.` })
        }
      })
      .catch(err => console.log(err))
  })
})

http.listen(PORT, () => {
  console.log('Server has started successfully!!!')
})
