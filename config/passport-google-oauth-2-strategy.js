const passport = require("passport");
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID: '910606280853-hdr82ias6qd9ckb3vjtku3c458rvtfb1.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8000/users/auth/google/callback"
  },
  function(accessToken, refressToken, profile, done){
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){
     if(err){ console.log('error in google passport strategy', err); return;}
     console.log(profile);
      
     if(user){
        return done(null, user);
     }else{
        User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString('hex')
        }, function(err, user){
            if(err){ console.log('error while creating user', err); return;}
                return done(null, user);
            });
     }
    });
  }
));

module.exports = passport;
