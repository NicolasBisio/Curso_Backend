class ProductsErrors {
    postNewProductError=(productToCreate)=>{
        return `Incomplete or invalid arguments:
        - title: expected String, recieved '${productToCreate.title}'.
        - description: expected String, recieved '${productToCreate.description}'.
        - price: expected Number, recieved '${productToCreate.price}'.
        - thumbnail: expected String, recieved '${productToCreate.thumbnail}'.
        - code: expected String, recieved '${productToCreate.code}'.
        - stock: expected Number, recieved '${productToCreate.stock}'.`
    }
    
    getProductByIdError=(idProd)=>{
        return `Expected an Id, instead recieved: '${idProd}'.`
    }

    getProductByTitleError=(title)=>{
        return `Expected a title, instead recieved: '${title}'.`
    }

    getProductsError=()=>{
        return `Error getting products from DB.`
    }

}

export const productsErrors = new ProductsErrors()