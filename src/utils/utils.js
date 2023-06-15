import { faker } from '@faker-js/faker/locale/es';
import bcrypt from 'bcrypt';
import swaggerJSDoc from 'swagger-jsdoc';

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

const swaggerSettings = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-COMMERCE Curso Backend CoderHouse',
            version: '1.0.0',
            description: 'Documentación de la API de productos y carritos',
        },
    },
    apis: ['./src/files/*.yaml'],
};

export const swaggerSpecs = swaggerJSDoc(swaggerSettings)