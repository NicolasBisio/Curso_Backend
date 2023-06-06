import dotenv from 'dotenv'

dotenv.config({
    override:true, path:'./.env'
})

export const config={
    app:{
        PORT:process.env.PORT,
        PERSISTENCIA: process.env.PERSISTENCIA,
        ENTORNO: process.env.ENTORNO
    },
    database:{
        MONGOURL: process.env.MONGOURL,
        DB: process.env.DB,
        FILECART: process.env.FILECART,
        FILEPRODUCT: process.env.FILEPRODUCT
    }
}