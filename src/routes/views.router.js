import { Router } from 'express';
const router = Router();

import ProductManagerDB from "../dao/productManagerDB.js";
const product = new ProductManagerDB

import ViewsManagerDB from "../dao/viewsManagerDB.js";
const view = new ViewsManagerDB

router.get('/products', view.getProducts)

router.get('/realtimeproducts', async (req, res) => {
    let products = await product.getProducts();
    res.status(200).render('realTimeProducts')
})

router.get('/chat', async (req, res) => {
    res.status(200).render('chat')
})

export default router;
