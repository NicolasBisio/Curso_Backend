import chai from 'chai'
import supertest from 'supertest'
import mongoose from 'mongoose';

import { config } from '../src/config/config.js';

mongoose.connect(config.database.MONGOURL, { dbName: config.database.DB })
    .then(conn => logger.info('Conexión a la DB establecida.'))

const expect = chai.expect;
const requester = supertest('http://localhost:3000')


describe('Testing endpoints router carts', function () {

    this.timeout(10000)

    describe('Testing endpoint POST /api/carts/:cid/products/:pid', () => {

        it('El endpoint debe agregar un producto existente a un carrito de la base de datos', async function () {

            let { body } = await requester.get('/api/carts')

            let idCart = body.carts[0]._id

            let { body: body2 } = await requester.get('/api/products')

            let idProd = body2.products[0]._id

            let { statusCode, body: body3 } = await requester.post('/api/carts/' + idCart + '/products/' + idProd)

            console.log(statusCode, body3)

            expect(body3).to.be.ok
            expect(statusCode).to.be.equal(201)

        })

        it('El endpoint debe devolver error con un status code == 400, si se envía un Id de carrito inválido', async function () {

            let idCart = 'Id_incorrecto'

            let { body } = await requester.get('/api/products')

            let idProd = body.products[0]._id

            let { statusCode } = await requester.post('/api/carts/' + idCart + '/products/' + idProd)

            expect(statusCode).to.be.equal(400)

        })

        it('El endpoint debe devolver error con un status code == 400, si se envía un Id de producto inválido', async function () {

            let idProd = 'Id_incorrecto'

            let { body } = await requester.get('/api/carts')

            let idCart = body.cart[0]._id

            let { statusCode } = await requester.post('/api/carts/' + idCart + '/products/' + idProd)

            expect(statusCode).to.be.equal(400)

        })

    })

})