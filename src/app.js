const path = require('path');
const express = require('express')
const engine = require('express-handlebars').engine
const Server = require('socket.io').Server;

const PORT = 3000

const app = express()

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './views'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const viewsRouter = require('./routes/views.router')
const productsRouter = require('./routes/products.router')
const cartsRouter = require('./routes/carts.router')

app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.use(express.static(path.join(__dirname, './public')));

app.get('*', (req, res) => {
    res.setHeader('Content-Type', 'aplication/json')
    res.status(404).json({
        message: `Not Found`
    })
})

const serverHttp = app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

const serverSockets = new Server(serverHttp);

const productManager = require("./productManager"); //*
const product = new productManager("./src/productos.json") //*

serverSockets.on('connection', (socket) => {
    console.log(`Se han conectado, socket id ${socket.id}`)
    product.getProducts().then(products => {
        socket.emit('getProducts', {products})
    })

})

serverHttp.on('error', (error) => console.log(error));