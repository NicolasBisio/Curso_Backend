import { Router } from 'express';
const router = Router();

import ViewsManagerDB from "../dao/viewsManagerDB.js";
const view = new ViewsManagerDB

router.get('/products', view.getProducts)

router.get('/cart/:cid', view.getCartById)

router.get('/realtimeproducts', view.getProductsRealTime)

router.get('/chat', view.getChat)


const auth = (req, res, next) => {
    if (!req.session.user) return res.redirect('/login')    //return res.sendStatus(401);
    next();
}

const auth2 = (req, res, next) => {
    if (req.session.user) return res.redirect('/')    //return res.sendStatus(401);
    next();
}

router.get('/', auth, (req, res) => {

    res.setHeader('Content-Type', 'text/html');
    res.status(200).render('home', {
        fullName: req.session.user.name + ' ' + req.session.user.lastName
    })
})

router.get('/signUp', auth2, (req, res) => {

    res.setHeader('Content-Type', 'text/html');
    res.status(200).render('signUp')
})

router.get('/login', auth2, (req, res) => {

    res.setHeader('Content-Type', 'text/html');
    res.status(200).render('login')
})

export default router;