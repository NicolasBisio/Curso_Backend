import { Router } from 'express';
const router = Router();

import ProductManager from '../dao/productManagerFS.js';
const product2 = new ProductManager('./src/productos.json')

router.get('/products', async (req, res) => {
    let products = await product2.getProducts();
    res.status(200).render('index', {products})
})

router.get('/realtimeproducts', async (req, res) => {
    let products = await product2.getProducts();
    res.status(200).render('realTimeProducts')
})

router.get('/chat', async (req, res) => {
    res.status(200).render('chat')
})

export default router;
