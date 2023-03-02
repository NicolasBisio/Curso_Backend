const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class productManager {
    constructor(archivo) {
        this.path = archivo;
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        const products = await this.getProducts();

        const newProduct = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            id: uuidv4()
        }

        products.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 3))

    }

    async getProducts() {
        if (fs.existsSync(this.path)) {
            let productosTxt = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(productosTxt);
        } else {
            return [];
        }
    }

    async getProductById(id) {
        if (fs.existsSync(this.path)) {

            let products = await fs.promises.readFile(this.path, "utf-8")
            products = JSON.parse(products)

            const productById = products.find(element => element.id == id);
            if (productById) {
                return productById
            } else {
                console.error("Not Found 1")
            }
        } else {
            console.error("Not Found 2")
        }
    }

    async updateProduct(title, description, price, thumbnail, code, stock, id) {
        if (fs.existsSync(this.path)) {

            let products = await fs.promises.readFile(this.path, "utf-8")
            products = JSON.parse(products)

            const position = products.findIndex(element => element.id == id);
            if (position !== -1) {
                let keepId = products[position].id
                products[position] = {
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock,
                }
                products[position].id = keepId

                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 3))
                return (`El producto ${products[position].title} con el ID ${products[position].id} fue actualizado correctamente en ${this.path}.`)

            } else {
                console.error("Not Found 1")
                return
            }
        } else {
            console.error("Not Found 2")
        }
    }

    async deleteProduct(id) {
        if (fs.existsSync(this.path)) {

            let products = await fs.promises.readFile(this.path, "utf-8");
            products = JSON.parse(products);

            const position = products.findIndex(element => element.id == id);

            if (position != -1) {
                let productosFiltrados = products.filter(element => element.id != id)
                console.log(`Se ha eliminado el producto con posición ${position} en ${this.path}`)
                products = productosFiltrados
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 3))
                return (`El producto fue eliminado exitosamente.`)
            } else {
                console.error("Not Found 1")
                return
            }
        } else {
            console.error("Not Found 2")
        }
    }
}

module.exports = productManager;