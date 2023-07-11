import { Router } from "express";
import { cartManager } from "../controllers/index.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get(
    "/",
    auth(['user'], '/login'),
    cartManager.getCarts
)

router.get(
    "/:cid",
    auth(['user'], '/login'),
    cartManager.getCartById
)

router.post(
    "/",
    auth(['user'], '/login'),
    cartManager.addCart
)

router.post(
    "/:cid/products/:pid",
    auth(['user'], '/login'),
    cartManager.addProductToCart
)

router.post(
    "/:cid/purchase",
    auth(['user'], '/login'),
    cartManager.sendPurchase
)

router.put(
    "/:cid/products/:pid",
    auth(['user'], '/login'),
    cartManager.updateProductFromCart
)

router.delete(
    "/:cid",
    auth(['user'], '/login'),
    cartManager.deleteCart
)

router.delete(
    "/:cid/products/:pid",
    auth(['user'], '/login'),
    cartManager.deleteProductFromCart
)

export { router as cartsRouter };