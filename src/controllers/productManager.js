import { productsService, usersService } from '../services/index.js';
import { generateFakeProduct } from '../utils/utils.js';

class ProductManager {

    async getProducts(req, res) {
        let products;
        try {
            products = await productsService.getProducts()
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
                products
            })

        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json({
                mensaje: `Error al obtener los productos de la DB`
            })
        }

    }

    async getProductById(req, res) {
        let idProd = req.params.pid;

        let productById = await productsService.getProductById(idProd)

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            productById
        })
    }

    async getProductByTitle(req, res) {
        let title = req.params.title;

        let productByTitle = await productsService.getProductByTitle(title)

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            productByTitle
        })
    }

    async getFakeProducts(req, res){
        let fakeProducts = []
        for(let i=0; i<101; i++){
            fakeProducts.push(generateFakeProduct())
        }

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({
            fakeProducts
        })
    }   

    async addProduct(req, res) {
        let productToCreate = req.body;

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
                res.status(200).json({
                    productCreated
                })
            }

        } else {
            res.setHeader("Content-Type", "aplication/json")
            return res.status(400).json({
                message: `Debe completar todos los campos.`
            })
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
            message: `Productos cargados exitosamente.`
        })

        process.exit();

    }

    async updateProduct(req, res) {
        let idProd = req.params.pid;

        let productToUpdate = req.body;
        let updatedProduct = await productsService.updateProductById(idProd, productToUpdate)

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            updatedProduct
        })
    }

    async deleteProduct(req, res) {
        let idProd = req.params.pid;
        let products = await productsService.deleteProductById(idProd);

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            products
        })
    }

}

export const productManager = new ProductManager()