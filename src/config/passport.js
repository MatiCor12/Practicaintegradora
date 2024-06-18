import passport from "passport";
import local from 'passport-local'
import GitHubStrategy from 'passport-github2'
import { getUserById, getUser, registerUser } from "../moderate/user.js"
import { createHash, isValidPassword } from "../utils.js"

const LocalStrategy = local.Strategy

export const initializePassport = () => {
//Estrategy
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            try {
                const { confirmPassword } = req.body
                if(password !== confirmPassword) {
                    console.log('No coinciden las contrasenas')
                return done(null, false)
                }
                const user = await getUser(username)

                if(user){
                    console.log('El usuario ya existe')
                    return done(null,false)
                }

                req.body.password = createHash(password)
                const newUser = await registerUser({ ...req.body })

                if(newUser)
                    return done(null, newUser)

                return done(null, false)

            } catch (error) {
                done(error)
            }
    }))

    passport.use('login', new LocalStrategy(
        {usernameField: 'email'},
        async (username, password, done) => {
            try{
                const user = await getUser(username)

                if(!user){
                    console.log('El usuario no existe')
                    done(null, false)
                }

                if(!isValidPassword(password, user.password)) {
                    console.log('Las password no coinciden')
                    return done(null,false)
                }
                return done(null, user)

            } catch (error) {
                done(error)
            }

        }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async(id, done) => {
        const user = await getUserById(id)
        done(null, user)
    })
}