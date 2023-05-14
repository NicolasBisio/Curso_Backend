import bcrypt from 'bcrypt';

export const createHash=(password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export const isValidPassword=(password, usuario)=>{
    return bcrypt.compareSync(password, usuario.password);
}