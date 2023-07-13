import { Router } from 'express';
import { viewsController } from '../controllers/index.js';

const router = Router();

const auth = (req, res, next) => {
    if (!req.session.user) return res.redirect('/login')
    next();
}

const auth2 = (req, res, next) => {
    if (req.session.user) return res.redirect('/')
    next();
}

const authCurrent = (req, res, next) => {
    if (req.session.user) return res.redirect('/api/sessions/current')
    next();
}

router.get('/products', viewsController.getProducts)

router.get('/cart/:cid', viewsController.getCartById)

router.get('/realtimeproducts', viewsController.getProductsRealTime)

router.get('/chat', viewsController.getChat)

router.get('/', auth, viewsController.getHome)

router.get('/signUp', auth2, viewsController.signUp)

router.get('/login', viewsController.login)

router.get('/loginCurrent', authCurrent, viewsController.loginCurrent)

export { router as viewsRouter}