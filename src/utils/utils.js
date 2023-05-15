import bcrypt from 'bcrypt';

const createHash=(password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

const isValidPassword=(password, usuario)=>{
    return bcrypt.compareSync(password, usuario.password);
}

export const hashUtils = {
    createHash,
    isValidPassword
}