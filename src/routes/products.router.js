import { Router } from "express";
import { productsController } from "../controllers/index.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get(
    '/',
    auth(['public'], '/login'),
    productsController.getProducts
)

router.get(
    '/:pid',
    auth(['public'], '/login'),
    productsController.getProductById
)

router.get(
    '/title/:title',
    auth(['public'], '/login'),
    productsController.getProductByTitle
)

router.get(
    '/fake/mockingproducts',
    auth(['admin'], '/login'),
    productsController.getFakeProducts
)

router.post(
    "/",
    auth(['admin'], '/login'),
    productsController.addProduct
)

router.post(
    "/massive",
    auth(['admin'], '/login'),
    productsController.addProductsMassive
)

router.put(
    "/:pid",
    auth(['admin'], '/login'),
    productsController.updateProduct
)

router.delete(
    "/:pid",
    auth(['admin'], '/login'),
    productsController.deleteProduct
)

export { router as productsRouter }