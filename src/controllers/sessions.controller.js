class SessionsManager {

    async getCurrentUser(req, res) {
        let currentUser = req.user

        res.setHeader("Content-Type", "application/json")
        return res.status(200).send({
            currentUser
        });

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