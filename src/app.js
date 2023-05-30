import __dirname from './dirname.js'
import path from 'path';
import express, { json, urlencoded } from 'express';
import { config } from './config/config.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import { inicializaEstrategias } from './config/passport.config.js';

import { cartsRouter, productsRouter, sessionsRouter, viewsRouter } from './routes/index.js'

import { messageManager } from './controllers/index.js';
import { generateFakeProduct } from './utils/utils.js';

const PORT = config.app.PORT

const app = express()

app.engine('handlebars', engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

app.use(json())
app.use(urlencoded({ extended: true }))

app.use(session({
    secret: 'secretCode',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://nbbisio:35584534@cluster0.bkyuey1.mongodb.net/?retryWrites=true&w=majority&dbName=ecommerce',
        ttl: 600
    })
}))
inicializaEstrategias();
app.use(passport.initialize());
app.use(passport.session());

app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionsRouter)

app.use(express.static('../public'));

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

const messages = []

serverSockets.on('connection', (socket) => {
    console.log(`Se han conectado, socket id ${socket.id}`)

    socket.on('message', (message) => {
        console.log(`${message.user} dice ${message.message}`);

        const newMessage = new messageManager

        newMessage.addMessage(message)

        serverSockets.emit('newMessage', message)

    })

})

export { messages };

serverHttp.on('error', (error) => console.log(error));