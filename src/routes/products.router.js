import { Router } from "express";
const router = Router();

//Llamar al controlador de MongoDB
import productManagerDB from "../dao/productManagerDB.js";
const product = new productManagerDB

router.get('/', product.getProducts)

router.post('/', product.addProduct)

router.put('/:pid', product.updateProduct)

router.delete('/:pid', product.deleteProduct)


//Llamando al controlador de FileSystem
// const productManager = require("../dao/productManagerFS.js");
// const product = new productManager("./src/productos.json")

// router.get('/', (req, res) => {
//     let limit = req.query.limit

//     if (limit) {
//         product.getProducts().then(products => {
//             limitedResult = products.slice(0, limit)
//             res.setHeader("Content-Type", "aplication/json")
//             res.status(200).send(limitedResult)
//         })
//     } else {
//         product.getProducts().then(products => {
//             res.setHeader("Content-Type", "aplication/json")
//             res.status(200).send(products)
//         })
//     }
// })

// router.get("/:pid", (req, res) => {
//     product.getProductById(req.params.pid).then(products => {
//         if (products) {
//             res.setHeader("Content-Type", "aplication/json")
//             res.status(200).send(products)
//         } else {
//             res.setHeader("Content-Type", "aplication/json")
//             res.status(400).json({
//                 message: `No existe el producto con Id '${req.params.pid}' en ${product.path}`
//             })
//         }
//     })
// })

// router.post("/", async (req, res) => {
//     let products = await product.getProducts();

//     let newProduct = req.body

//     let repeatedProduct = products.find(element => element.code === newProduct.code)

//     if (newProduct.title && newProduct.description && newProduct.price && newProduct.thumbnail && newProduct.code && newProduct.stock) {
//         if (repeatedProduct) {
//             console.log(`El producto ${newProduct.title} ya existe en ${product.path}`)
//             res.setHeader("Content-Type", "aplication/json")
//             return res.status(400).json({
//                 message: `El producto ${newProduct.title} ya existe en ${product.path}`
//             })
//         } else {
//             await product.addProduct(newProduct.title, newProduct.description, newProduct.price, newProduct.thumbnail, newProduct.code, newProduct.stock)
//             await product.getProducts().then(products => {
//                 res.setHeader("Content-Type", "aplication/json")
//                 res.status(201).json({
//                     products
//                 })
//             })
//         }
//     } else {
//         console.log("Debe completar todos los campos")
//         res.setHeader("Content-Type", "aplication/json")
//         return res.status(400).json({
//             message: `Debe completar todos los campos`
//         })
//     }
// })

// router.put("/:pid", async (req, res) => {
//     let newProduct = req.body
//     if (newProduct.title && newProduct.description && newProduct.price && newProduct.thumbnail && newProduct.code && newProduct.stock) {
//         let result = await product.updateProduct(newProduct.title, newProduct.description, newProduct.price, newProduct.thumbnail, newProduct.code, newProduct.stock, req.params.pid)
//         if (result) {
//             await product.getProducts().then(products => {
//                 res.setHeader("Content-Type", "aplication/json")
//                 res.status(200).json({
//                     products
//                 })
//             })
//         } else {
//             res.setHeader("Content-Type", "aplication/json")
//             return res.status(400).json({
//                 message: `El producto con Id ${req.params.pid} no existe en ${product.path}`
//             })
//         }
//     } else {
//         res.setHeader("Content-Type", "aplication/json")
//         return res.status(400).json({
//             message: `Debe completar todos los campos`
//         })
//     }
// })

// router.delete("/:pid", async (req, res) => {
//     let result = await product.deleteProduct(req.params.pid)

//     if (result) {
//         await product.getProducts().then(products => {
//             res.setHeader("Content-Type", "aplication/json")
//             res.status(200).json({
//                 products
//             })
//         })
//     } else {
//         res.setHeader("Content-Type", "aplication/json")
//         await res.status(400).json({
//             message: `No existe el producto con Id '${req.params.pid}' en ${product.path}`
//         })
//     }
// })


export default router;