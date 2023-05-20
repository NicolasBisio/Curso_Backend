import { Router } from 'express';
import passport from 'passport';
import { sessionsManager } from '../controllers/index.js';

const router = Router();

const auth = (req, res, next) => {
    if (!req.session.user) return res.redirect('/loginCurrent')
    next();
}

router.get('/current', auth, sessionsManager.getCurrentUser)

router.get('/github', passport.authenticate('github', {}), sessionsManager.github)

router.get('/callbackGithub', passport.authenticate('github', { failureRedirect: '/login' }), sessionsManager.callbackGithub)

router.post('/signUp', passport.authenticate('signUp', { failureRedirect: '/signUp', successRedirect: '/login' }), sessionsManager.signUp)

router.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), sessionsManager.login)

router.post('/loginCurrent', passport.authenticate('login', { failureRedirect: '/loginCurrent' }), sessionsManager.loginCurrent)

router.get('/logout', sessionsManager.logout)

export { router as sessionsRouter }