const express = require('express')
const app = express()
const http = require('http').Server(app)
const PORT = process.env.PORT || 3999

const db = require('./db')
const route = require('./routes')
const middleware = require('./middlewares')
const errHandle = require('./middlewares/errHandle')
const buyProduct = require('./api/product/buyProduct')
const request = require('./api/request/request')

db.connect()
middleware(app)
route(app)
app.use(errHandle)

const io = require('socket.io')(http, {
  cors: {
    origin: 'https://gamingshopvn.herokuapp.com',
    credentials: true
  }
})

app.get('/', (req, res) => {
  res.send('Vào nhầm link rồi, vào link API làm gì, link website đây này!!! <a href=\'https://gamingshopvn.herokuapp.com\'>click here</a>')
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
          const newNotif = { content: `Nick ${product.name} đã được mua.` }
          io.to(product._id).emit('buy-product-notif', { newNotif })
          socket.emit('change-coins', { newCoins: product.price })
        }
      })
      .catch(err => console.log(err))
  })

  socket.on('create-product', () => {
    io.to('admin').emit('create-notif')
  })

  socket.on('request', ({ userId, coins, newCoins }) => {
    request(userId, coins, newCoins)
      .then(res => {
        if (res) {
          socket.emit('request-successfully')
          io.to('admin').emit('money-request-notif', { newCoins })
        }
      })
      .catch(err => console.log('request err'))
  })
})

http.listen(PORT, () => {
  console.log('Server has started successfully!!!')
})
