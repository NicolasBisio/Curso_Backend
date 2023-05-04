import { Router } from 'express';
const router = Router();

import ViewsManagerDB from "../controllers/viewsManagerDB.js";
const view = new ViewsManagerDB

const auth = (req, res, next) => {
    if (!req.session.user) return res.redirect('/login')
    next();
}

const auth2 = (req, res, next) => {
    //console.log(req.session.user)
    if (req.session.user) return res.redirect('/')
    next();
}

router.get('/products', view.getProducts)

router.get('/cart/:cid', view.getCartById)

router.get('/realtimeproducts', view.getProductsRealTime)

router.get('/chat', view.getChat)

router.get('/', auth, view.getHome)

router.get('/signUp', auth2, view.signUp)

router.get('/login', auth2, view.login)

export default router;