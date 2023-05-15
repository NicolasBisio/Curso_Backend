import { Router } from 'express';
import passport from 'passport';
import { usersModel } from '../dao/models/users.models.js';

const router = Router();

router.get('/current', (req, res) => {
    
    req.session.user = {
        name: req.user.name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role
    }

    res.send(req.session.user)
})

router.get('/github', passport.authenticate('github', {}), (req, res) => {

})

router.get('/callbackGithub', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {

    req.session.usuario = {
        nombre: req.user.nombre,
        apellido: req.user.apellido,
        email: req.user.email,
        edad: req.user.edad
    }

    res.redirect('/');

})

router.post('/signUp', passport.authenticate('signUp', { failureRedirect: '/signUp', successRedirect: '/login' }), async (req, res) => {

})

router.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {

    req.session.user = {
        name: req.user.name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role
    }

    res.redirect('/products');

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

export { router as sessionsRouter}