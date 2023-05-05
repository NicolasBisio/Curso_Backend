import { promises, existsSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { productsDao } from '../app.js';

export default class ProductManager {
    constructor(archivo) {
        this.path = archivo;

        this.getProducts = this.getProducts.bind(this);
        this.getProductById = this.getProductById.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    // async addProduct(req, res) {
    //     let products = await productsDao.get()
    //     products = JSON.parse(products);

    //     let newProduct = req.body
    //     let repeatedProduct = products.find(element => element.code === newProduct.code)

    //     if (newProduct.title && newProduct.description && newProduct.price && newProduct.thumbnail && newProduct.code && newProduct.stock) {
    //         if (repeatedProduct) {
    //             console.log(`El producto ${newProduct.title} ya existe.`)
    //             res.setHeader("Content-Type", "aplication/json")
    //             return res.status(400).json({
    //                 message: `El producto ${newProduct.title} ya existe.`
    //             })
    //         } else {
    //             newProduct = {
    //                 title: newProduct.title,
    //                 description: newProduct.description,
    //                 price: newProduct.price,
    //                 thumbnail: newProduct.thumbnail,
    //                 code: newProduct.code,
    //                 stock: newProduct.stock,
    //                 id: uuidv4()
    //             }
    //             products.push(newProduct)
    //             await productsDao.post(products)
    //             res.setHeader("Content-Type", "aplication/json")
    //             res.status(200).json({
    //                 products
    //             })
    //         }
    //     } else {
    //         console.log("Debe completar todos los campos")
    //         res.setHeader("Content-Type", "aplication/json")
    //         return res.status(400).json({
    //             message: `Debe completar todos los campos.`
    //         })
    //     }
    // }

    async addProduct(req, res) {
        let productToCreate = req.body;

        let productsDB = await productsDao.get()

        if (productToCreate.title &&
            productToCreate.description &&
            productToCreate.price &&
            productToCreate.thumbnail &&
            productToCreate.code &&
            productToCreate.stock) {

            let repeatedProduct = productsDB.find(element => element.code == productToCreate.code)

            if (repeatedProduct) {
                res.setHeader("Content-Type", "aplication/json")
                return res.status(400).json({
                    message: `El producto ${productToCreate.title} ya existe en la BD.`
                })
            } else {
                productToCreate = {
                    title: productToCreate.title,
                    description: productToCreate.description,
                    price: productToCreate.price,
                    thumbnail: productToCreate.thumbnail,
                    code: productToCreate.code,
                    stock: productToCreate.stock,
                }

                await productsDao.post(productToCreate)

                console.log(productToCreate)

                res.setHeader("Content-Type", "aplication/json")
                return res.status(200).json({
                    productToCreate
                })
            }

        } else {
            res.setHeader("Content-Type", "aplication/json")
            return res.status(400).json({
                message: `Debe completar todos los campos.`
            })
        }

    }

    async getProducts(req, res) {
        let products;
        try {
            products = await productsDao.get()
            console.log(products)
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
                products
            })

        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json({
                mensaje: `Error al obtener los productos`
            })
        }

    }

    async getProductById(req, res) {
        if (existsSync(this.path)) {
            let id = req.params.pid

            let products = await productsDao.get()
            products = JSON.parse(products)

            const productById = products.find(element => element.id == id);
            if (productById) {
                res.setHeader("Content-Type", "aplication/json")
                res.status(200).send(productById)
            } else {
                console.error("Not Found 1")
                res.setHeader("Content-Type", "aplication/json")
                res.status(400).json({
                    message: `No existe el producto con Id '${req.params.pid}' en ${this.path}`
                })
            }
        } else {
            console.error("Not Found 2")
        }
    }

    async updateProduct(req, res) {
        if (existsSync(this.path)) {

            let newProduct = req.body
            let id = req.params.pid

            console.log(newProduct)

            let products = await productsDao.get()
            products = JSON.parse(products)

            if (newProduct.title && newProduct.description && newProduct.price && newProduct.thumbnail && newProduct.code && newProduct.stock) {

                const position = products.findIndex(element => element.id == id);
                if (position !== -1) {
                    let keepId = products[position].id
                    products[position] = {
                        title: newProduct.title,
                        description: newProduct.description,
                        price: newProduct.price,
                        thumbnail: newProduct.thumbnail,
                        code: newProduct.code,
                        stock: newProduct.stock,
                    }
                    products[position].id = keepId

                    await productsDao.post(products)
                    res.setHeader("Content-Type", "aplication/json")
                    res.status(200).json({
                        products
                    })
                    return (`El producto ${products[position].title} con el ID ${products[position].id} fue actualizado correctamente.`)
                } else {
                    res.setHeader("Content-Type", "aplication/json")
                    return res.status(400).json({
                        message: `Producto no encontrado 1`
                    })
                }
            } else {
                res.setHeader("Content-Type", "aplication/json")
                return res.status(400).json({
                    message: `Debe completar todos los campos`
                })
            }
        } else {
            res.setHeader("Content-Type", "aplication/json")
            return res.status(400).json({
                message: `Producto no encontrado 2`
            })
        }
    }

    async deleteProduct(req, res) {
        if (existsSync(this.path)) {
            let id = req.params.pid
            let products = await productsDao.get()
            products = JSON.parse(products);

            const position = products.findIndex(element => element.id == id);

            if (position != -1) {
                let productosFiltrados = products.filter(element => element.id != id)
                console.log(`Se ha eliminado el producto con posición ${position}`)
                products = productosFiltrados
                await productsDao.post(products)
                res.setHeader("Content-Type", "aplication/json")
                res.status(200).json({
                    products
                })
            }

        } else {
            res.setHeader("Content-Type", "aplication/json")
            await res.status(400).json({
                message: `No existe el producto con Id '${req.params.pid}' en ${product.path}`
            })
        }
    }
}