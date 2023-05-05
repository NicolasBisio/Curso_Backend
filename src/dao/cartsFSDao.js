import { cartsModel } from './models/carts.models.js';
import { promises } from 'fs';

export class CartsFSDao {
    constructor(archivo) { //ver cómo hacer con el archivo. Variables de entorno??
        this.path = archivo;
    }

    async get() {
        return await promises.readFile(this.path, "utf-8");
    }

    async post(products) {
        return await promises.writeFile(this.path, JSON.stringify(products, null, 3))
    }

}