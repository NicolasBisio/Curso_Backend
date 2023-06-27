import chai from 'chai'
import supertest from 'supertest'
// import { productsModel } from '../src/dao/models/products.models.js';
import mongoose from 'mongoose';

const expect = chai.expect;
const requester = supertest('http://localhost:3000')


describe('Testing endpoints router carts', () => {

    before(function () {
        this.timeout(5000)
    })

    describe('Testing endpoint POST /api/carts/:cid/products/:pid', () => {

        it('El endpoint debe agregar un producto a un carrito de la base de datos', async function () {

            // let { body, statusCode } = await requester.get('/api/products')

            // expect(body.products).to.be.an('array')
            // expect(statusCode).to.be.equal(200)

        })

        it('El endpoint debe validar que el producto que se agregue exista previamente en la base de datos de productos', async function () {

            // let { body, statusCode } = await requester.get('/api/products')

            // expect(body.products).to.be.an('array')
            // expect(statusCode).to.be.equal(200)

        })

    })

})