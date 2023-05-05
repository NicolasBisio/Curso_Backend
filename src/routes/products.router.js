import { Router } from "express";

const router = Router();

//Llamar al controlador de MongoDB
import ProductManagerDB from "../controllers/productManagerDB.js";
const product = new ProductManagerDB

// Llamando al controlador de FileSystem
// import ProductManager from "../controllers/productManagerFS.js";
// const product = new ProductManager("./src/productos.json")

router.get('/', product.getProducts)

router.get('/:pid', product.getProductById)

router.post("/", product.addProduct)

//router.post("/massive", product.addProductsMassive)

router.put("/:pid", product.updateProduct)

router.delete("/:pid", product.deleteProduct)

export default router;