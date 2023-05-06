import { promises } from 'fs';
import fs from 'fs'

export class CartsFSDao {
    constructor(archivo) {
        if (!fs.existsSync(archivo)) {
            let carritos = []
            fs.writeFileSync(archivo, JSON.stringify(carritos, null, 5))
        }
        this.path = archivo;
    }

    async get() {
        return JSON.parse(await promises.readFile(this.path, "utf-8"));
    }

    async getById(id) {
        console.log(id)
        let carts = JSON.parse(await promises.readFile(this.path, "utf-8"));
        let cart = carts.find(cart => cart.id == id)
        console.log(cart)
        return cart
    }

    async post(cart) {
        let carritos = await this.get()
        if (carritos.length == 0) {
            cart.id = 1
        } else {
            cart.id = carritos[carritos.length - 1].id + 1
        }
        console.log(carritos)
        carritos.push(cart)
        await promises.writeFile(this.path, JSON.stringify(carritos, null, 3))
        return carritos
    }

    async updateOne(id, cart) {
        let carts = JSON.parse(await promises.readFile(this.path, "utf-8"));
        let indice = carts.findIndex(prod => prod.id == id)
        if (indice != -1) {
            carts.splice(indice, 1)
            carts.push(cart)
            await promises.writeFile(this.path, JSON.stringify(carts, null, 3))
            return cart
        }
    }

    async deleteOne(cart) {
        let carts = JSON.parse(await promises.readFile(this.path, "utf-8"));
        let indice = carts.findIndex(pr => pr.id == id)
        if (indice != -1) {
            carts.splice(indice, 1)
            await promises.writeFile(this.path, JSON.stringify(cart, null, 3))
            return carts
        }
    }

}