import { Router } from "express";
const router = Router();

//Llamar al controlador de MongoDB
// import ProductManagerDB from "../dao/productManagerDB.js";
// const product = new ProductManagerDB

// router.get('/', product.getProducts)

// router.post('/', product.addProduct)

// router.put('/:pid', product.updateProduct)

// router.delete('/:pid', product.deleteProduct)


// Llamando al controlador de FileSystem
import ProductManager from "../dao/productManagerFS.js";
const product = new ProductManager("./src/productos.json")

router.get('/', product.getProducts)

router.post("/", product.addProduct)

router.put("/:pid", product.updateProduct)

router.delete("/:pid", product.deleteProduct)

export default router;