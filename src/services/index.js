import { setDao } from '../dao/factory.js';
import { CartsService } from './carts.services.js';
import { ProductsService } from './products.services.js';

const dao = await setDao()
const daoCart = dao.carts
const daoProduct = dao.products

export const productsService = new ProductsService(daoProduct)
export const cartsService = new CartsService(daoCart)
export { usersService } from './users.services.js';


