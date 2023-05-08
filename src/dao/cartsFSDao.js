import { promises } from 'fs';
import fs from 'fs'

export class CartsFSDao {
    constructor(archivo) {
        if (!fs.existsSync(archivo)) {
            let carts = []
            fs.writeFileSync(archivo, JSON.stringify(carts, null, 5))
        }
        this.path = archivo;
    }

    async get() {
        return JSON.parse(await promises.readFile(this.path, "utf-8"));
    }

    async getById(idCart) {
        console.log(idCart)
        let carts = JSON.parse(await promises.readFile(this.path, "utf-8"));
        let cart = carts.find(cart => cart.id == idCart)
        console.log(cart)
        return cart
    }

    async post(cart) {
        let carts = await this.get()
        carts.push(cart)
        await promises.writeFile(this.path, JSON.stringify(carts, null, 3))
        return carts
    }

    async updateOne(idCart, cart) {
        let carts = JSON.parse(await promises.readFile(this.path, "utf-8"));
        let indice = carts.findIndex(cart => cart.id == idCart)
        if (indice != -1) {
            carts.splice(indice, 1)
            carts.push(cart)
            await promises.writeFile(this.path, JSON.stringify(carts, null, 3))
            return cart
        }
    }

    async deleteOneCart(idCart) {
        let carts = JSON.parse(await promises.readFile(this.path, "utf-8"));
        let indice = carts.findIndex(cart => cart.id == idCart)
        if (indice != -1) {
            carts.splice(indice, 1)
            await promises.writeFile(this.path, JSON.stringify(carts, null, 3))
            return carts
        }
    }

}