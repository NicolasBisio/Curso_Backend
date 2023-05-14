import mongoose from 'mongoose'
import { config } from '../config/config.js'
import { DB } from './singleton.js'

const PERSISTENCIA = config.app.PERSISTENCIA

export const setDao = async () => {
    switch (PERSISTENCIA) {
        case 'FS':
            let { CartsFSDao } = await import('./cartsFSDao.js')
            let { ProductsFSDao } = await import('./productsFSDao.js')

            return {
                carts: new CartsFSDao(config.database.FILECART),
                products: new ProductsFSDao(config.database.FILEPRODUCT)
            }
            break;

        case 'DB':
            const conectar =()=> DB.conectar()
            conectar() 

            let { CartsDBDao } = await import('./cartsDBDao.js')
            let { ProductsDBDao } = await import('./productsDBDao.js')

            return {
                carts: new CartsDBDao(),
                products: new ProductsDBDao()
            }
            break;

        default:
            break;
    }
}