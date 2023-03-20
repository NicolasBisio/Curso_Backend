import { Router } from 'express';
const router = Router();

import ViewsManagerDB from "../dao/viewsManagerDB.js";
const view = new ViewsManagerDB

router.get('/products', view.getProducts)

router.get('/cart/:cid', view.getCartById)

router.get('/realtimeproducts', view.getProductsRealTime)

router.get('/chat', view.getChat)

export default router;
