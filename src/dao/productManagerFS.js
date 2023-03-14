import { promises, existsSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export default class ProductManager {
    constructor(archivo) {
        this.path = archivo;
    }

    async addProduct(req, res) {
        const products = await this.getProducts();

        let newProduct = req.body
        let repeatedProduct = products.find(element => element.code === newProduct.code)

        if (newProduct.title && newProduct.description && newProduct.price && newProduct.thumbnail && newProduct.code && newProduct.stock) {
            if (repeatedProduct) {
                console.log(`El producto ${newProduct.title} ya existe.`)
                res.setHeader("Content-Type", "aplication/json")
                return res.status(400).json({
                    message: `El producto ${newProduct.title} ya existe.`
                })
            } else {
                newProduct = {
                    title: newProduct.title,
                    description: newProduct.description,
                    price: newProduct.price,
                    thumbnail: newProduct.thumbnail,
                    code: newProduct.code,
                    stock: newProduct.stock,
                    id: uuidv4()
                }
                products.push(newProduct)
                await promises.writeFile("./src/productos.json", JSON.stringify(products, null, 3))
                // await this.getProducts().then(products => {
                //     res.setHeader("Content-Type", "aplication/json")
                //     res.status(201).json({
                //         products
                //     })
                // })
            }
        } else {
            console.log("Debe completar todos los campos")
            res.setHeader("Content-Type", "aplication/json")
            return res.status(400).json({
                message: `Debe completar todos los campos.`
            })
        }
    }


    async getProducts(req, res) {
        if (existsSync("./src/productos.json")) {
            let limit = req.query.limit;
            let productosTxt = await promises.readFile("./src/productos.json", "utf-8");
            let products = JSON.parse(productosTxt);

            if (limit) {
                let limitedResult = products.slice(0, limit);
                res.setHeader("Content-Type", "application/json");
                res.status(200).send(limitedResult);
            } else {
                res.setHeader("Content-Type", "application/json");
                res.status(200).send(products);
            }
        } else {
            return []
        }
    }


    // async getProductById(id) {
    //     if (existsSync(this.path)) {

    //         let products = await promises.readFile(this.path, "utf-8")
    //         products = JSON.parse(products)

    //         const productById = products.find(element => element.id == id);
    //         if (productById) {
    //             return productById
    //         } else {
    //             console.error("Not Found 1")
    //         }
    //     } else {
    //         console.error("Not Found 2")
    //     }
    // }

    async updateProduct(req, res) {
        if (existsSync("./src/productos.json")) {

            let newProduct = req.body
            let id = req.params.pid

            console.log(newProduct)

            let products = await promises.readFile("./src/productos.json", "utf-8")
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

                    await promises.writeFile("./src/productos.json", JSON.stringify(products, null, 3))
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
        if (existsSync("./src/productos.json")) {
            let id = req.params.pid
            let products = await promises.readFile("./src/productos.json", "utf-8");
            products = JSON.parse(products);

            const position = products.findIndex(element => element.id == id);

            if (position != -1) {
                let productosFiltrados = products.filter(element => element.id != id)
                console.log(`Se ha eliminado el producto con posición ${position}`)
                products = productosFiltrados
                await promises.writeFile("./src/productos.json", JSON.stringify(products, null, 3))
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

