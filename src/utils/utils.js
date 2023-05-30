import { faker } from '@faker-js/faker/locale/es';
import bcrypt from 'bcrypt';

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

const isValidPassword = (password, usuario) => {
    return bcrypt.compareSync(password, usuario.password);
}

export const hashUtils = {
    createHash,
    isValidPassword
}

export const generateFakeProduct = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        thumbnail: faker.image.url(),
        code: faker.string.alphanumeric(5),
        stock: faker.number.int({max: 25000})
    }

}