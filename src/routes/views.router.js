const Router = require('express').Router;
const router = Router();

const productManager = require('../dao/productManagerFS.js');
const product = new productManager('./src/productos.json')

router.get('/products', async (req, res) => {
    let products = await product.getProducts();
    res.status(200).render('index', {products})
})

router.get('/realtimeproducts', async (req, res) => {
    let products = await product.getProducts();
    res.status(200).render('realTimeProducts')
})

router.get('/chat', async (req, res) => {
    res.status(200).render('chat')
})

module.exports = router;
