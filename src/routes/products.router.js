import { Router } from "express";
import { productManager } from "../controllers/index.js";

const router = Router();

router.get('/', productManager.getProducts)

router.get('/:pid', productManager.getProductById)

router.post("/", productManager.addProduct)

router.post("/massive", productManager.addProductsMassive)

router.put("/:pid", productManager.updateProduct)

router.delete("/:pid", productManager.deleteProduct)

export { router as productsRouter}