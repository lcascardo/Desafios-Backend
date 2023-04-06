import passport from "passport";
import local from "passport-local";
import Users from '../dao/dbManagers/users.js';
import userModel from "../dao/models/user.js";
import Carts from "../dao/dbManagers/carts.js";
import { createHash, isValidPassword } from "../utils.js";


const localStrategy = local.Strategy;
const userManager = new Users();
const cartManager = new Carts();

const initializePassport = async () => {
    passport.use('register', new localStrategy({ passReqToCallback: true, usernameField: 'email', session: false },
        async (req, email, password, done) => {
            try {
                const {first_name, last_name, email, age } = req.body;
                if (!first_name || !last_name || !password) return done(null, false, { message: "Incomplete values" });
                const exists = await userManager.getById({ email: email });
                if (exists) return done(null, false, { message: "User already exists" });
                const hashedPassword = await createHash(password);
                
               let newCart = await cartManager.saveCart();
                
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: hashedPassword,
                    cart:newCart._id.toString() 
                }

                let result = await userManager.saveUser(newUser);
                
                cartManager.updateCart(newCart._id,{user:result._id.toString()})
                return done(null, result)
            }
            catch (error) {
                return done(error)
            }
        }
    ))

    passport.use('login' , new localStrategy({usernameField:'email' , session:false},
        async(email,password,done) => {
            try{
                const user = await userManager.getBy({email});
                if(!user) return done(null,false,{message:"User not found"});
                const passwordValidate = await isValidPassword(user,password)

                if(!passwordValidate) return done(null,false,{message:"Incorrect password"})
                return done(null,user)
            }
            catch(error){
                return done(error)
            }
        }
    ))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    });

    passport.deserializeUser(async(id,done)=>{
        let result = await userModel.findOne({_id:id});
        return done(null,result)
    })
}

export default initializePassport;




























// const initPassport = () => {

//     passport.use(
//         'register',
//         new localStrategy(
//             { passReqToCallback: true, usernameField: 'email' },
//             async (req, username, password, done) => {
//                 const { first_name, last_name, email, age } = req.body;
//                 try {
//                     let user = await userModel.findOne({ email: username });
//                     if (user) {
//                         console.log("Usuario ya existe");
//                         return done(null, false)
//                     }

//                     const result = {
//                         first_name,
//                         last_name,
//                         email,
//                         age,
//                         password: createHash(password),
//                         rol: "user"
//                     }

//                     let newUser = await userModel.create(result);
//                     return done(null, newUser);

//                 }
//                 catch (error) {
//                     return done("Error al obtener el ususario" + error)
//                 }
//             }
//         ))


//     passport.serializeUser((user, done) => {
//         done(null, user._id);
//     })

//     passport.deserializeUser(async (id, done) => {
//         let user = await userModel.findById(id);
//         done(null, user);
//     })

//     passport.use('login', new localStrategy(
//         { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {

//             try {
//                 const user = await userModel.findOne({ email: username });
//                 if (!user) {
//                     console.log("Usuario no existe");
//                     return done(null, false)
//                 }
//                 if (!isValidPassword(user, password)) return done(null, false);

//                 return done(null, user)
//             }
//             catch (error) {
//                 return done("Error al obtener el ususario" + error)
//             }

//         }
//     ))

//     passport.use('github', new userService({
//         clientID: "Iv1.2e981da9706cb337",
//         clientSecret: "67f60e47fd57130e2fd0c6a9d3043a140721d3c6",
//         callbackURL: "http://localhost:8080/api/session/githubcallback"
//     }, async (accessToken, refreshToken, profile, done) => {
//         try {
//             console.log(profile);
//             let user = await userModel.findOne({ email: profile._json.email })
//             if (!user) {
//                 let newUser = {
//                     first_name: profile._json.name,
//                     last_name: "Perez",
//                     age: 18,
//                     email: profile._json.login + "@gmail.com",
//                     password: '123'
//                 }
//                 let result = await userModel.create(newUser);
//                 done(null, result)
//             } else {
//                 done(null, user)
//             }
//         }
//         catch (error) {
//             return done(error)
//         }
//     }))

// }


// export default initPassport;

