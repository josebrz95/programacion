import {Router} from "express";
import {Auth} from "../lib/auth";
import passport from "passport";

const route = Router();

export function generateAuthenticationRoutes(app: Router): void {
    app.use('', route);
    route.get('/signup', Auth.isNotLoggedIn, (req, res) => {
        res.render('auth/signup');
    });
    route.post('/signup', passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    route.get('/signin', Auth.isNotLoggedIn, (req, res) => {
        res.render('auth/signin');
    });
    route.post('/signin', (req, res, next) => {
        passport.authenticate('local.signin', {
            successRedirect: '/profile',
            failureRedirect: '/signin',
            failureFlash: true
        })(req, res, next);
    });
    route.get('/profile', Auth.isLoggedIn, (req, res) => {
        res.render('auth/profile');
    })

    route.get('/logout', (req, res) => {
        req.logOut((err) => {
            if (err) console.log(err?.messsage)
            req.flash('message', 'Gracias por usar esta cosa que se le podria llamar "app" (mas o menos)');
            res.redirect('/signin');
        });
    });
}
