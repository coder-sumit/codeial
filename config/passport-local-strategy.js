const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;


const User = require('../models/user');


passport.use(new LocalStrategy({
   usernameField: 'email',
   passReqToCallback: true
},
 function(req, email, password, done){
    User.findOne({email: email}, (err, user)=>{
      // handle errors and checks
      if(err){console.log("Error FInding In User"); return done(err);}
      
      if(!user || (user.password != password)){
        console.log("Invalid Password"); 
        req.flash('error', 'Invalid Username/Password');
        return done(null, false);
    }

      return done(null, user);

    });
 }
));


// serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the keys in the cookies 
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      if(err){console.log("Error FInding In User"); return done(err);}
      return done(null, user);
    })
});

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if user is signed in then pass to next
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed in
    return res.redirect('/users/sign-in');
    
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the cookei
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;