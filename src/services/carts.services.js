export class CartsService {
    constructor(dao) {
        this.dao = dao
    }

    async getCarts() {
        return await this.dao.get()
    }

    async getCartById(idCart) {
        return await this.dao.getById(idCart)
    }

    async createNewCart(cart) {
        return await this.dao.post(cart)
    }

    async updateCartById(idCart, cart) {
        return await this.dao.updateOne(idCart, cart)
    }

    async deleteCartById(idCart) {
        return await this.dao.deleteOne(idCart)
    }

    async deleteProductFromCart(idCart, idProd) {
        let productToDelete = { $pull: { products: { productId: idProd } } }
        return await this.dao.updateOne(idCart, productToDelete)
    }
    
}
