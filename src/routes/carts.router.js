import { Router } from "express";
import cartManager from "../controllers/cartManager.js";

const router = Router();

const cart = new cartManager

router.get('/', cart.getCarts)

router.get("/:cid", cart.getCartById)

router.post("/", cart.addCart)

router.post("/:cid/products/:pid", cart.addProductToCart)

router.put("/:cid/products/:pid", cart.updateProductFromCart)

router.delete("/:cid", cart.deleteCart)

router.delete("/:cid/products/:pid", cart.deleteProductFromCart)

export default router;