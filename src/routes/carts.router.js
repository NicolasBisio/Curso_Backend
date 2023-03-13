import { Router } from "express";
const router = Router();

//Llamar al controlador de MongoDB
import cartManagerDB from "../dao/cartManagerDB.js";
const cart = new cartManagerDB

router.get('/', cart.getCarts)

router.post('/', cart.addCart)

router.put('/:pid', cart.updateCart)

router.delete('/:pid', cart.deleteCart)

// Llamar al controlador de FileSystem 
// const cartManager = require("../dao/cartManagerFS.js");
// const cart = new cartManager("./src/cart.json")

// router.post("/", (req, res) => {
//     cart.addCart().then(cart => {
//         res.setHeader("Content-Type", "aplication/json")
//         res.status(201).json({
//             cart
//         })
//     })
// })

// router.get("/:cid", (req, res) => {
//     cart.getCartById(req.params.cid).then(cart => {
//         if (cart) {
//             res.setHeader("Content-Type", "aplication/json")
//             res.status(200).json({
//                 cart
//             })
//         } else {
//             res.setHeader("Content-Type", "aplication/json")
//             res.status(400).json({
//                 message: `No existe el carrito con Id '${req.params.cid}'`
//             })
//         }
//     })
// })

// router.post("/:cid/products/:pid", async (req, res) => {
//     cart.addProductToCart(req.params.cid, req.params.pid).then(carts => {
//         if (carts) {
//             res.setHeader("Content-Type", "aplication/json")
//             res.status(201).json({
//                 carts
//             })
//         } else {
//             res.setHeader("Content-Type", "aplication/json")
//             res.status(400).json({
//                 message: `No existe el carrito con Id '${req.params.cid}'`
//             })
//         }
//     })
// })

export default router;