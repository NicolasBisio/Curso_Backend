const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class cartManagerDB {
    constructor(archivo) {
        this.path = archivo;
    }

    async getCarts() {
        if (fs.existsSync(this.path)) {
            let cartsTxt = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(cartsTxt);
        } else {
            return []
        }
    }

    async addCart() {
        let carts = await this.getCarts()
        let newCart = {
            id: uuidv4(),
            products: []
        }
        carts.push(newCart)
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 3))
        return carts
    }

    async getCartById(id) {
        if (fs.existsSync(this.path)) {

            let carts = await fs.promises.readFile(this.path, "utf-8")
            carts = JSON.parse(carts)

            const cartById = carts.find(element => element.id == id);
            if (cartById) {
                return cartById
            } else {
                console.error("Not Found 1")
            }
        } else {
            console.error("Not Found 2")
        }
    }

    async addProductToCart(idCart, idProd) {
        const carts = await this.getCarts();
        const newProduct = {
            id: idProd,
            quantity: 1
        }

        let indexCart = await carts.findIndex(element => element.id == idCart)
        if (indexCart !== -1) {
            let indexProd = await carts[indexCart].products.findIndex(element => element.id == idProd)
            if (indexProd === -1) {
                await carts[indexCart].products.push(newProduct)
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 3))
                return carts
            } else {
                carts[indexCart].products[indexProd].quantity++
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 3))
                return carts
            }
        } else {
            console.error("Not Found 1")
        }
    }
}

module.exports = cartManagerDB;