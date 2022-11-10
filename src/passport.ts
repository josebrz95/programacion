import passport from "passport";
import {Strategy} from 'passport-local';

export const authUser = (user, password, done) => {
    let authenticated_user = { id: 123, name: "Kyle"}
    return done(null, authenticated_user )
}

passport.use(new Strategy(authUser))
passport.serializeUser( (userObj, done) => {
    done(null, userObj)
})
passport.deserializeUser((userObj, done) => {
    done (null, userObj )
})

export default passport
