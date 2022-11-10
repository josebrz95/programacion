import { Request } from "express";
import passport from 'passport';
import * as passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import { helpers } from './helpers';
import { User } from "../entities/User";
import { UserService } from "../services/UserService";

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req: Request, username, password, done) => {
    const userService = new UserService()
    const user = await userService.getUserByCriteria({ username })
    if (!user) {
        req.flash('message', 'Usuario o contraseña incorrectos');
        return done(null, false);
    }
    const validPassword = await helpers.matchPassword(password, user.password);
    if (!validPassword) {
        req.flash('message', 'Usuario o contraseña incorrectos');
        done(null, false);
    }
    done(null, user);
}));


passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req: Request, username, password, done) => {
    const {email, city, state, phone} = req.body;

    const newUser = {
        username,
        password,
        email,
        state,
        phone
    }
    if(!/[a-z]/.test(password) || !/[A-Z]/.test(password) ||
            !/[0-9]/.test(password) || password.length < 8 ){
        req.flash('message', "Contraseña no valida");
        return done(null, null);
    }
    newUser.password = await helpers.encryptPassword(password);
    const userService = new UserService()
    try {
        await userService.create(newUser).then((result) => {
            req.flash('message', 'Usuario creado con éxito');
            return done(null, result);
        });
    } catch (err) {
        console.log(err.message)
        req.flash('message', err.message);
        return done(null, null);
    }

}));

passport.serializeUser((usr: User, done) => {
    done(null, usr.id);
});

passport.deserializeUser(async (id: string, done) => {
    const userService = new UserService()
    const result = await userService.getData(id)
    done(null, result);
})
