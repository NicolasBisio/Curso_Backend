import { Router } from 'express';
import passport from 'passport';
import { usersModel } from '../dao/models/users.models.js';
import { createHash, isValidPassword } from "../utils/utils.js"

const router = Router();

router.get('/github',passport.authenticate('github',{}),(req,res)=>{

})

router.get('/callbackGithub',passport.authenticate('github',{failureRedirect:'/login'}),(req,res)=>{

    req.session.usuario={
        nombre:req.user.nombre, 
        apellido:req.user.apellido, 
        email:req.user.email, 
        edad:req.user.edad
    }

    res.redirect('/');

})

router.post('/signUp', passport.authenticate('signUp', { failureRedirect: '/signUp', successRedirect: '/login' }), async (req, res) => {

})

router.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {

    req.session.user = {
        name: req.user.name,
        lastName: req.user.lastName,
        email: req.user.email,
        age: req.user.age,
        rol: req.user.rol
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

export default router;
