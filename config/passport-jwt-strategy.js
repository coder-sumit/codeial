const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'
}

passport.use(new JWTStrategy(opts, function(jwtpayloads, done){
     User.findById(jwtpayloads._id, function(err, user){
        if(err){
            console.log("Error in Fiding user from jwt!");
            return;
        }
        if(!user){
            return done(null, false);
        }else{
            return done(null, user);
        }
     })
}));

module.exports = passport;

