import { Router } from "express";
import { cartManager } from "../controllers/index.js";

const router = Router();

router.get('/', cartManager.getCarts)

router.get("/:cid", cartManager.getCartById)

router.post("/", cartManager.addCart)

router.post("/:cid/products/:pid", cartManager.addProductToCart)

router.post("/:cid/purchase", cartManager.sendPurchase)

router.put("/:cid/products/:pid", cartManager.updateProductFromCart)

router.delete("/:cid", cartManager.deleteCart)

router.delete("/:cid/products/:pid", cartManager.deleteProductFromCart)

export { router as cartsRouter};