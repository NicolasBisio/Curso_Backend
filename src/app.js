import __dirname from './utils/utils.js';
import path from 'path';
import express, { json, urlencoded } from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { default as mongoose } from 'mongoose';

const PORT = 3000

const app = express()

app.engine('handlebars', engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './views'));

app.use(json())
app.use(urlencoded({ extended: true }))

import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

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

// import ProductManager from "./dao/productManagerFS.js";
// const product = new ProductManager("./productos.json")

const messages = []

serverSockets.on('connection', (socket) => {
    console.log(`Se han conectado, socket id ${socket.id}`)
    // product.getProducts().then(products => {
    //     socket.emit('getProducts', { products })
    // })

    socket.on('message', (message) => {
        console.log(`${message.user} dice ${message.message}`);

        const messageManagerDB = require("./dao/messageManagerDB.js");
        const newMessage = new messageManagerDB

        newMessage.addMessage(message)

        serverSockets.emit('newMessage', message)

    })

})

const conectar = async () => {
    try {
        await mongoose.connect('mongodb+srv://nbbisio:35584534@cluster0.bkyuey1.mongodb.net/?retryWrites=true&w=majority&dbName=ecommerce')
        console.log('Conexión a BD establecida')
    } catch (error) {
        console.log(`Error al conectarse con el servidor de BD: ${error}`)
    }
}

conectar()

export default messages;

serverHttp.on('error', (error) => console.log(error));
