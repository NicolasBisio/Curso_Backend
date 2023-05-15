import { Router } from 'express';
import { viewsManager } from '../controllers/index.js';

const router = Router();

const auth = (req, res, next) => {
    if (!req.session.user) return res.redirect('/login')
    next();
}

const auth2 = (req, res, next) => {
    if (req.session.user) return res.redirect('/')
    next();
}

router.get('/products', viewsManager.getProducts)

router.get('/cart/:cid', viewsManager.getCartById)

router.get('/realtimeproducts', viewsManager.getProductsRealTime)

router.get('/chat', viewsManager.getChat)

router.get('/', auth, viewsManager.getHome)

router.get('/signUp', auth2, viewsManager.signUp)

router.get('/login', auth2, viewsManager.login)

export { router as viewsRouter}