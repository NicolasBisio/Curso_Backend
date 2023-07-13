import { Router } from "express";
import { cartsController } from "../controllers/index.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get(
    "/",
    auth(['user'], '/login'),
    cartsController.getCarts
)

router.get(
    "/:cid",
    auth(['user'], '/login'),
    cartsController.getCartById
)

router.post(
    "/",
    auth(['user'], '/login'),
    cartsController.addCart
)

router.post(
    "/:cid/products/:pid",
    auth(['user'], '/login'),
    cartsController.addProductToCart
)

router.post(
    "/:cid/purchase",
    auth(['user'], '/login'),
    cartsController.sendPurchase
)

router.put(
    "/:cid/products/:pid",
    auth(['user'], '/login'),
    cartsController.updateProductFromCart
)

router.delete(
    "/:cid",
    auth(['user'], '/login'),
    cartsController.deleteCart
)

router.delete(
    "/:cid/products/:pid",
    auth(['user'], '/login'),
    cartsController.deleteProductFromCart
)

export { router as cartsRouter };