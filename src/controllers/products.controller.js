import mongoose from 'mongoose';
import { customError, errorCodes, productsErrors } from '../errors/index.js';
import { productsService } from '../services/index.js';
import { logger } from '../utils/index.js';
import { generateFakeProduct } from '../utils/utils.js';

class ProductsController {

    async getProducts(req, res) {
        let products;

        try {
            products = await productsService.getProducts()

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
                products
            })

        } catch (error) {
            logger.error(error)
            res.setHeader("Content-Type", "application/json")
            return res.status(error.code).json({ message: error.message })
        }

    }

    async getProductById(req, res) {
        let idProd = req.params.pid;

        try {
            let productById = await productsService.getProductById(idProd)

            if (productById) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({
                    productById
                })
            } else {
                customError.customError('Invalid Product Id', productsErrors.getProductByIdError(idProd), errorCodes.ERROR_ARGUMENTS)
            }

        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                if (error.kind === "ObjectId") {
                    logger.error(error)
                    res.setHeader("Content-Type", "application/json")
                    return res.send({ error: 'Invalid Id format' })
                }
            }

            logger.error(error)
            res.setHeader("Content-Type", "application/json")
            return res.status(error.code).json({ message: error.message })
        }
    }


    async getProductByTitle(req, res) {
        let title = req.params.title;

        try {
            let productByTitle = await productsService.getProductByTitle(title)

            if (productByTitle) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({
                    productByTitle
                })
            } else {
                customError.customError('Invalid Product title', productsErrors.getProductByTitleError(title), errorCodes.ERROR_ARGUMENTS)
            }

        } catch (error) {
            logger.error(error)
            res.setHeader("Content-Type", "application/json")
            return res.status(error.code).json({ message: error.message })
        }

    }

    async getFakeProducts(req, res) {
        let fakeProducts = []
        for (let i = 0; i < 101; i++) {
            fakeProducts.push(generateFakeProduct())
        }

        let productsCreated = await productsService.createManyProducts(fakeProducts)

        res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({
            productsCreated
        })
    }

    async addProduct(req, res) {
        let productToCreate = req.body;

        try {
            let products = await productsService.getProducts()

            if (productToCreate.title &&
                productToCreate.description &&
                productToCreate.price &&
                productToCreate.thumbnail &&
                productToCreate.code &&
                productToCreate.stock) {

                let repeatedProduct = products.find(prod => prod.code == productToCreate.code)

                if (repeatedProduct) {
                    res.setHeader("Content-Type", "aplication/json")
                    return res.status(400).json({
                        message: `El producto ${productToCreate.title} ya existe.`
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

                    let productCreated = await productsService.createProduct(productToCreate)

                    res.setHeader("Content-Type", "aplication/json")
                    res.status(201).json({
                        productCreated
                    })
                }

            } else {
                customError.customError('Incomplete or invalid arguments', productsErrors.postNewProductError(productToCreate), errorCodes.ERROR_ARGUMENTS)
            }

        } catch (error) {
            logger.error(error)
            res.setHeader("Content-Type", "application/json")
            return res.status(error.code).json({ message: error.message })
        }

    }

    async addProductsMassive(req, res) {
        let titles = ['Producto1', 'Producto2', 'Producto3', 'Producto4', 'Producto5', 'Producto6', 'Producto7', 'Producto8', 'Producto9', 'ProductoA', 'ProductoB', 'ProductoC', 'ProductoD', 'ProductoE', 'ProductoF', 'ProductoG', 'ProductoH', 'ProductoI']
        let descriptions = ['DescA', 'DescB', 'DescC', 'DescD', 'DescE', 'DescF', 'DescG', 'DescH', 'DescI', 'DescJ', 'DescK', 'DescL', 'DescM', 'DescN', 'DescO']
        let prices = [10000, 15000, 20000, 23000, 25000, 34000, 45000, 50000, 68000, 72000]
        let thumbnails = [10000, 15000, 20000, 23000, 25000, 34000, 45000, 50000, 68000, 72000]
        let stocks = [100, 150, 200, 230, 25000, 340, 450, 500, 680, 720, 1000]

        let productsMassive = []

        for (let i = 1; i <= 1000; i++) {
            let a1 = Math.round(Math.random() * (titles.length - 1));
            let a2 = Math.round(Math.random() * (descriptions.length - 1));
            let a3 = Math.round(Math.random() * (prices.length - 1));
            let a4 = Math.round(Math.random() * (thumbnails.length - 1));
            let a5 = Math.round(Math.random() * (stocks.length - 1));

            productsMassive.push(
                {
                    title: titles[a1],
                    description: descriptions[a2],
                    price: prices[a3],
                    thumbnail: thumbnails[a4],
                    code: i + 1000,
                    stock: stocks[a5]
                }
            )

        }

        await productsService.createManyProducts(productsMassive)

        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({
            message: `Products added successfully.`
        })

        process.exit();

    }

    async updateProduct(req, res) {
        let idProd = req.params.pid;
        let productToUpdate = req.body;

        try {
            if (productToUpdate.title &&
                productToUpdate.description &&
                productToUpdate.price &&
                productToUpdate.thumbnail &&
                productToUpdate.code &&
                productToUpdate.stock) {

                let updatedProduct = await productsService.updateProductById(idProd, productToUpdate)

                res.setHeader('Content-Type', 'application/json');
                res.status(201).json({
                    updatedProduct
                })

            } else {
                customError.customError('Incomplete or invalid arguments', productsErrors.postNewProductError(productToUpdate), errorCodes.ERROR_ARGUMENTS)
            }

        } catch (error) {
            logger.error(error)
            res.setHeader("Content-Type", "application/json")
            return res.status(error.code).json({ message: error.message })
        }
    }

    async deleteProduct(req, res) {
        let idProd = req.params.pid;
        let products;
        try {
            products = await productsService.deleteProductById(idProd);
            if (products) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({
                    products
                })
            } else {
                customError.customError('Invalid Product Id', productsErrors.getProductByIdError(idProd), errorCodes.ERROR_ARGUMENTS)
            }

        } catch (error) {
            logger.error(error)
            res.setHeader("Content-Type", "application/json")
            return res.status(error.code).json({ message: error.message })
        }

    }

}

export const productsController = new ProductsController()