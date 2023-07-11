import { Router } from "express";
import { productManager } from "../controllers/index.js";
import { auth } from "../middlewares/auth.middleware.js";
import passport from 'passport';

const router = Router();

router.get(
    '/',
    passport.authenticate('login'),
    auth(['public'], '/login'),
    productManager.getProducts
)

router.get(
    '/:pid',
    auth(['public'], '/login'),
    productManager.getProductById
)

router.get(
    '/title/:title',
    auth(['public'], '/login'),
    productManager.getProductByTitle
)

router.get(
    '/fake/mockingproducts',
    auth(['admin'], '/login'),
    productManager.getFakeProducts
)

router.post(
    "/",
    auth(['admin'], '/login'),
    productManager.addProduct
)

router.post(
    "/massive",
    auth(['admin'], '/login'),
    productManager.addProductsMassive
)

router.put(
    "/:pid",
    auth(['admin'], '/login'),
    productManager.updateProduct
)

router.delete(
    "/:pid",
    auth(['admin'], '/login'),
    productManager.deleteProduct
)

export { router as productsRouter }