import passport from 'passport';
import local from 'passport-local';
import github from 'passport-github2';
import { usersModel, cartsModel } from '../dao/models/index.js';
import { hashUtils } from "../utils/index.js"

export const inicializaEstrategias = () => {

    passport.use('github', new github.Strategy({
        clientID: 'Iv1.eadd6dee48feccf4',
        clientSecret: '5115b80e42bc3a3b2c85d0b215e00221170ca56a',
        callbackURL: 'http://localhost:3000/api/sessions/callbackGithub'
    }, async (accessToken, refreshToken, profile, done) => {

        try {
            let name = profile._json.name;
            let email = profile._json.email;

            let usuario = await usersModel.findOne({ email: email });
            if (!usuario) {
                let usuarioNuevo = {
                    name,
                    email,
                    github: true,
                    githubProfile: profile._json
                }
                usuario = await usersModel.create(usuarioNuevo);
            } else {
                let actualizaUsuario = {
                    github: true,
                    githubProfile: profile._json
                }

                await usersModel.updateOne({ email: email }, actualizaUsuario);
            }

            done(null, usuario)

        } catch (error) {
            done(error)
        }


    }))

    passport.use('signUp', new local.Strategy({ usernameField: 'email', passReqToCallback: true }, async (req, username, password, done) => {

        try {

            let { name, last_name, age } = req.body;

            if (!username || !password) return done(null, false)

            let user = await usersModel.findOne({ email: username })

            if (user) return done(null, false);

            let role = "user"
            if (username == "adminCoder@coder.com" || password == "adminCod3r123") {
                role = "admin"
            }

            let newUser = await usersModel.create({
                name,
                last_name,
                email: username,
                age,
                password: hashUtils.createHash(password),
                role,
                cart: await cartsModel.create({ products: [] }),
            })

            return done(null, newUser);

        } catch (error) {
            done(error);
        }

    }))

    passport.use('login', new local.Strategy({ usernameField: 'email' }, async (username, password, done) => {

        console.log('Entró al passport.login')
        
        try {

            if (!username || !password) return done(null, false)

            let usuario = await usersModel.findOne({ email: username })

            if (!usuario) return done(null, false);
            if (!hashUtils.isValidPassword(password, usuario)) return done(null, false);

            return done(null, usuario);

        } catch (error) {
            return done(error);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (id, done) => {
        let usuario = await usersModel.findOne({ _id: id });
        done(null, usuario);
    });

}