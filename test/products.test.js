import chai from 'chai'
import supertest from 'supertest'
import mongoose from 'mongoose';
import { config } from '../src/config/config.js';
import { logger } from '../src/utils/index.js';
logger

await mongoose.connect(config.database.MONGOURL, { dbName: config.database.DB })
    .then(conn => logger.info('Conexión a la DB establecida.'))

const expect = chai.expect;
const requester = supertest('http://localhost:3000')

describe('Testing endpoints router products', function () {

    this.timeout(5000)

    describe('Testing endpoint GET /api/products/', () => {

        it('El endpoint debe obtener un array con los productos de la base de datos', async function () {

            let { body, statusCode } = await requester.get('/api/products')

            expect(body.products).to.be.an('array')
            expect(statusCode).to.be.equal(200)

        })

        it('Los productos que obtiene el endpoint tienen las propiedades requeridas en el Schema', async function () {

            let { body } = await requester.get('/api/products')

            if (body.products.length > 0) {
                expect(body.products[0]).to.have.property('title').and.is.a('string')
                expect(body.products[0]).to.have.property('description').and.is.a('string')
                expect(body.products[0]).to.have.property('price').and.is.a('number')
                expect(body.products[0]).to.have.property('thumbnail').and.is.a('string')
                expect(body.products[0]).to.have.property('code').and.is.a('string')
                expect(body.products[0]).to.have.property('stock').and.is.a('number')
            } else {
                expect(body.products.length).to.be.equal(0)
            }

        })

        it('Los productos que obtiene el endpoint tienen un Id generado por MongoDB', async function () {

            let { body } = await requester.get('/api/products')

            if (body.products.length > 0) {
                expect(body.products[0]).to.have.property('_id')
                expect(body.products[0]._id).to.have.length(24)
            } else {
                expect(body.products.length).to.be.equal(0)
            }

        })

    })

    describe('Testing endpoint POST /api/products/', () => {

        afterEach(async function () {
            this.timeout(5000)
            await mongoose.connection.collection('products').deleteMany({ code: 'abc123' })
        })

        it('El endpoint debe agregar un nuevo producto a la base de datos', async function () {

            let newProduct = {
                title: 'Producto de prueba',
                description: 'Este es un producto de prueba',
                price: 250,
                thumbnail: 'abc.jpg',
                code: 'abc123',
                stock: 100,
            }

            let { statusCode, body } = await requester.post('/api/products').send(newProduct)

            expect(body.productCreated.code).to.be.equal(newProduct.code)
            expect(statusCode).to.be.equal(201)

        })

        it('Al cargarse en la base de datos, el producto recibe un Id autogenerado por MongoDB', async function () {

            let newProduct = {
                title: 'Producto de prueba',
                description: 'Este es un producto de prueba',
                price: 250,
                thumbnail: 'abc.jpg',
                code: 'abc123',
                stock: 100,
            }

            let { body } = await requester.post('/api/products').send(newProduct)

            expect(body.productCreated).to.have.property('_id')
            expect(body.productCreated._id).to.have.length(24)

        })

    })
})