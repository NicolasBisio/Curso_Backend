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
        let carts = await this.get()
        let cartByID = carts.find(cart => cart.id == idCart)
        return cartByID
    }

    async post(cartToCreate) {
        let carts = await this.get()
        cartToCreate.id = uuidv4()
        carts.push(cartToCreate)
        await promises.writeFile(this.path, JSON.stringify(carts, null, 3));
        return cartToCreate
    }

    async updateOne(idCart, cart) {
        let carts = await this.get()
        let cartIndex = carts.findIndex(cart => cart.id == idCart)
        if (cartIndex != -1) {
            carts.splice(cartIndex, 1)
            cart.id = idCart
            carts.push(cart)
            await promises.writeFile(this.path, JSON.stringify(carts, null, 3))
            return cart
        }
    }

    async deleteOneCart(idCart) {
        let carts = await this.get()
        let cartIndex = carts.findIndex(cart => cart.id == idCart)
        if (cartIndex != -1) {
            carts.splice(cartIndex, 1)
            await promises.writeFile(this.path, JSON.stringify(carts, null, 3))
            return carts
        }
    }

}