// import mongoose from 'mongoose';

// let nombres = ['Lautaro', 'Martina', 'Jimena', 'Morena', 'Marcos', 'Luca', 'Diego', 'Isabella', 'Juana', 'Carolina', 'Fernando', 'Federico', 'Gonzalo', 'Víctor', 'Catalina', 'Juan Carlos', 'Rodrigo', 'Luis']
// let apellidos = ['Gonzalez', 'Marinoff', 'Fernandez', 'Souto', 'Blanco', 'Gimenez', 'Roncaglia', 'Benitez', 'Rivas', 'Petrelli', 'Napoli', 'Rubinstein', 'Bermudez', 'Tapia', 'Negri']
// let estudios = ['literatura', 'medicina', 'desarrollo web', 'desarrollo backend', 'idiomas', 'rrhh', 'administración de empresas', 'profesorado', 'ingeniería civil', 'abogacia', 'física', 'tecnicatura en ciencias de la comunicación', 'finanzas', 'economía', 'ciencias politicas']
// let pais_de_origen = ['Argentina', 'España', 'Mexico', 'Uruguay', 'Perú', 'Chile', 'Colombia', 'Costa Rica']
// let server = ['@gmail.com', '@yahoo.es', '@hotmail.com', '@yahoo.com.ar', '@gmx.com', '@outlook.com']
// let ingresos = [10000,15000,20000,23000,25000,34000,45000,50000,68000,72000,100000] 

// let usuarios=[]

// for (let i = 1; i <= 50000; i++) {
//     let a1 = Math.round(Math.random() * (nombres.length - 1));
//     let a2 = Math.round(Math.random() * (apellidos.length - 1));
//     let a3 = Math.round(Math.random() * (estudios.length - 1));
//     let a4 = Math.round(Math.random() * (pais_de_origen.length - 1));
//     let a5 = Math.round(Math.random() * (server.length - 1));
//     let a6 = Math.round(Math.random() * (ingresos.length - 1));

//     usuarios.push(
//         {
//             codigo: i + 10000,
//             nombre: nombres[a1],
//             apellido: apellidos[a2],
//             email: (nombres[a1] + apellidos[a2] + server[a5]).toLowerCase(),
//             estudios: estudios[a3].toLocaleUpperCase(),
//             origen: pais_de_origen[a4],
//             edad: Math.floor(Math.random()*35+20),
//             ingresoAnualPromedio: ingresos[a6] 
//         }
//     )
// }

// const usuariosColeccion = 'usuarios'

// const usuariosEsquema = new mongoose.Schema({
//     codigo: Number,
//     nombre: String,
//     apellido: String,
//     email: String,
//     estudios: String,
//     origen: String,
//     edad: Number,
//     ingresoAnualPromedio: Number 
// },{collection:'usuariosBig'})

// const usuarioModelo = mongoose.model(usuariosColeccion, usuariosEsquema);

// const env = async () => {
//     try {
//         await mongoose.connect('mongodb+srv://nbbisio:35584534@cluster0.bkyuey1.mongodb.net/?retryWrites=true&w=majority&dbName=ecommerce')

//         console.log(`Conexión a DB establecida`);

//         await usuarioModelo.deleteMany({});
//         await usuarioModelo.insertMany(usuarios)

//         console.log(`Base de datos usuariosBig creada correctamente...!!!`);

//         process.exit();
//     } catch (error) {
//         console.log(`Error en la app: ${error}`);
//     }
// }

// env()