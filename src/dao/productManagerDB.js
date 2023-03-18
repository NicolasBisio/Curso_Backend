import productsModel from './models/products.models.js';

export default class ProductManagerDB {

    async getProducts(req, res) {
        let products;
        try {
            products = await productsModel.find()
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json({
                mensaje: `Error al obtener los productos de la DB`
            })
        }

        res.setHeader('Content-Type', 'text/html');
        res.status(200).render('products', {
            products
        })

    }

    async addProduct(req, res) {
        let productToCreate = req.body;

        let newProduct = await productsModel.create(productToCreate);

        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({
            newProduct
        })

    }

    async addProductsMassive(req, res) {
        let titles = ['Producto1', 'Producto2', 'Producto3', 'Producto4', 'Producto5', 'Producto6', 'Producto7', 'Producto8', 'Producto9', 'ProductoA', 'ProductoB', 'ProductoC', 'ProductoD', 'ProductoE', 'ProductoF', 'ProductoG', 'ProductoH', 'ProductoI']
        let descriptions = ['DescA', 'DescB', 'DescC', 'DescD', 'DescE', 'DescF', 'DescG', 'DescH', 'DescI', 'DescJ', 'DescK', 'DescL', 'DescM', 'DescN', 'DescO']
        let prices = [10000, 15000, 20000, 23000, 25000, 34000, 45000, 50000, 68000, 72000 ]
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

        await productsModel.deleteMany({});
        await productsModel.insertMany(productsMassive)

        console.log(`Base de datos usuariosBig creada correctamente...!!!`);

        process.exit();

    }

    async updateProduct(req, res) {
        let id = req.params.pid;

        let productToUpdate = req.body;
        let newProduct = await productsModel.updateOne({ _id: id }, productToUpdate)

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            newProduct
        })
    }

    async deleteProduct(req, res) {
        let id = req.params.pid;

        let productToDelete = await productsModel.deleteOne({ _id: id });

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            productToDelete
        })
    }

}