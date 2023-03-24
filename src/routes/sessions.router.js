import { Router } from 'express';
import { usersModel } from '../dao/models/users.models.js';
import crypto from 'crypto';

const router = Router();

router.post('/signUp', async (req, res) => {

    let { name, lastName, mail, password, age } = req.body;

    if (!mail || !password) return res.sendStatus(400) 

    let currentUser = await usersModel.findOne({ mail: mail })

    if (currentUser) return res.sendStatus(400);

    let rol = "user"
    if (mail == "adminCoder@coder.com" || password == "adminCod3r123") {
        rol = "admin"
    }

    usersModel.create({
        name, lastName, mail,
        password: crypto.createHash('sha256', 'palabraSecreta').update(password).digest('base64'),
        age, rol
    })

    res.redirect('/login');

})

router.post('/login', async (req, res) => {

    let { mail, password } = req.body;

    if (!mail || !password) return res.sendStatus(400)

    let user = await usersModel.findOne({ mail: mail, password: crypto.createHash('sha256', 'palabraSecreta').update(password).digest('base64') })

    console.log(user)
    if (!user) return res.sendStatus(401)

    req.session.user = {
        name: user.name,
        lastName: user.lastName,
        mail,
        age: user.age,
        rol: user.rol
    }

    res.render('home', {
        fullName: user.name + ' ' + user.lastName,
        rol: user.rol
    })

})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.redirect('/login');
        }
    });
})

export default router;
