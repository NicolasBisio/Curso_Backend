import __dirname from './dirname.js'
import path from 'path';
import express, { json, urlencoded } from 'express';
import { config } from './config/config.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import { inicializaEstrategias } from './config/passport.config.js';

import { cartsRouter, productsRouter, sessionsRouter, viewsRouter } from './routes/index.js'

import { messagesController } from './controllers/index.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { logger, swaggerSpecs } from './utils/index.js';


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
        mongoUrl: config.database.MONGOURL, dbName: config.database.DB,
        ttl: 3000
    })
}))

inicializaEstrategias();
app.use(passport.initialize());
app.use(passport.session());

app.use('/', viewsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use("/loggertest", (req, res) => {
    logger.fatal('Logger.fatal');
    logger.error('Logger.error');
    logger.warning('Logger.warning');
    logger.info('Logger.info');
    logger.http('Logger.http');
    logger.debug('Logger.debug');
    res.status(200).send('Loggers Ok.')
});

app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
    res.setHeader('Content-Type', 'aplication/json')
    res.status(404).json({
        message: `Not Found`
    })
})

app.use(errorMiddleware)

const serverHttp = app.listen(PORT, () => {
    logger.info(`Example app listening on port ${PORT}`)
})

const serverSockets = new Server(serverHttp);

serverSockets.on('connection', (socket) => {
    socket.on('message', (message) => {
        messagesController.addMessage(message)
        serverSockets.emit('newMessage', message)
    })

})

serverHttp.on('error', (error) => logger.fatal(error));