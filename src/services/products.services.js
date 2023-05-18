export class ProductsService {
    constructor(dao) {
        this.dao = dao
    }

    async getProducts() {
        return await this.dao.get()
    }

    async getProductByTitle(title) {
        let products = await this.dao.get()
        let productByTitle = products.find(prod => prod.title == title)
        return productByTitle
    }

    async createProduct(product) {
        return await this.dao.post(product)
    }

    async getProductById(idProd) {
        return await this.dao.getById(idProd)
    }

    async createManyProducts(products) {
        return await this.dao.postMany(products)
    }

    async updateProductById(idProd, product) {
        return await this.dao.updateById(idProd, product)
    }

    async deleteProductById(idProd) {
        return await this.dao.deleteById(idProd)
    }
}
