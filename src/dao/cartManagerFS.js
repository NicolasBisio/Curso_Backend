import { existsSync, promises } from 'fs';
import { v4 as uuidv4 } from 'uuid';

class cartManager {
    constructor(archivo) {
        this.path = archivo;
    }

    async getCarts() {
        if (existsSync(this.path)) {
            let cartsTxt = await promises.readFile(this.path, "utf-8");
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
        await promises.writeFile(this.path, JSON.stringify(carts, null, 3))
        return carts
    }

    async getCartById(id) {
        if (existsSync(this.path)) {

            let carts = await promises.readFile(this.path, "utf-8")
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
                await promises.writeFile(this.path, JSON.stringify(carts, null, 3))
                return carts
            } else {
                carts[indexCart].products[indexProd].quantity++
                await promises.writeFile(this.path, JSON.stringify(carts, null, 3))
                return carts
            }
        } else {
            console.error("Not Found 1")
        }
    }
}

export default cartManager;