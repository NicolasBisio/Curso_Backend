import { usersService } from "../services/index.js";

class SessionsManager {

    async getCurrentUser(req, res) {

        let userByEmail = await usersService.getUserByEmail(req.user.email);
        if (userByEmail) {
            return res.status(200).send({
                userByEmail
            });
        } else {
            return res.status(500).send({
                message: 'No se pudo cargar la información del usuario.'
            });
        }
    }

    github(req, res) { }

    callbackGithub(req, res) {

        req.session.usuario = {
            nombre: req.user.nombre,
            apellido: req.user.apellido,
            email: req.user.email,
            edad: req.user.edad
        }

        res.redirect('/');

    }

    async signUp(req, res) { }

    async login(req, res) {

        req.session.user = {
            name: req.user.name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role
        }

        res.redirect('/products');

    }

    async loginCurrent(req, res) {

        req.session.user = {
            name: req.user.name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role
        }

        res.redirect('/api/sessions/current');

    }

    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.redirect('/login');
            }
        });
    }
}

export const sessionsManager = new SessionsManager()