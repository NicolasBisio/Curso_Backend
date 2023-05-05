import { productsModel } from './models/products.models.js';
import { existsSync, promises } from 'fs';

export class ProductsFSDao {
    constructor(archivo) {
        this.path = archivo;
    }

    async get() {
        let products = []
        if (existsSync(this.path)) {
            let productosTxt = await promises.readFile(this.path, "utf-8");
            products.push(JSON.parse(productosTxt));
            return products
        } else {
            return []
        }
    }

    async post(products) {
        let productosTxt = await promises.readFile(this.path, "utf-8");
        products.push(JSON.parse(productosTxt));
        products.push(products)
        return await promises.writeFile(this.path, JSON.stringify(products, null, 3))
    }

}