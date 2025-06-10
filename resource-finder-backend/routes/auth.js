import express from "express";
import passport from "passport";

const router = express.Router();

router.get('/auth/google', passport.authenticate('google', {scope:['profile']}))

router.get('/auth/google/callback', passport.authenticate('google', {successRedirect:'http://localhost:5173', failureRedirect:'/login'}));

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/auth/github/callback', passport.authenticate('github', { successRedirect: 'http://localhost:5173', failureRedirect: '/login' }));

router.get('/auth/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    })
})

export default router;