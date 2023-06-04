class CartsErrors {
    postNewProductError = (productToCreate) => {
        return `Incomplete or invalid arguments:
            - title: expected String, recieved '${productToCreate.title}'.
            - description: expected String, recieved '${productToCreate.description}'.
            - price: expected Number, recieved '${productToCreate.price}'.
            - thumbnail: expected String, recieved '${productToCreate.thumbnail}'.
            - code: expected String, recieved '${productToCreate.code}'.
            - stock: expected Number, recieved '${productToCreate.stock}'.`
    }

    getCartByIdError = (idCart) => {
        return `Expected a valid Cart Id, instead recieved: '${idCart}'.`
    }

    getCartsError = () => {
        return `Error getting carts from DB.`
    }

}

export const cartsErrors = new CartsErrors()