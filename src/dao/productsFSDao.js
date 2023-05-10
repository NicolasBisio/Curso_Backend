import { promises } from 'fs';
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';

export class ProductsFSDao {
    constructor(archivo) {
        if (!fs.existsSync(archivo)) {
            let products = []
            fs.writeFileSync(archivo, JSON.stringify(products, null, 5))
        }
        this.path = archivo;
    }

    async get() {
        return JSON.parse(await promises.readFile(this.path, "utf-8"));
    }

    async getById(idProd) {
        let products = await this.get()
        let productById = products.find(prod => prod.id == idProd)
        return productById;
    }

    async post(productToCreate) {
        let products = await this.get()
        productToCreate.id = uuidv4()
        products.push(productToCreate)
        await promises.writeFile(this.path, JSON.stringify(products, null, 3))
        return productToCreate
    }

    async updateById(idProd, productToUpdate) {
        let products = await this.get()
        let productIndex = products.findIndex(prod => prod.id == idProd)

        if (productIndex != -1) {
            products.splice(productIndex, 1)
            productToUpdate.id = idProd
            products.push(productToUpdate)
            await promises.writeFile(this.path, JSON.stringify(products, null, 3))
            return productToUpdate
        }

    }

    async deleteById(idProd) {
        let products = await this.get()
        let productIndex = products.findIndex(prod => prod.id == idProd)

        if (productIndex != -1) {
            products.splice(productIndex, 1)
            await promises.writeFile(this.path, JSON.stringify(products, null, 3))
            return products
        }

    }


}