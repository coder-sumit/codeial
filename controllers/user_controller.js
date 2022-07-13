const User = require('../models/user');

// these controllers contains only one callback so need of async await here

module.exports.profile = function(req, res){
     let id = req.params.id;
     User.findById(id, (err, user)=>{
         return res.render('user_profile.ejs', {
               title: "Profile",
               profile_user: user
          });
     });
     
};

module.exports.update = function(req, res){
     if(req.params.id == req.user.id){
          console.log(req.body);
          User.findByIdAndUpdate(req.params.id, {
               name: req.body.name,
               email: req.body.email
          }, function(err, user){
               return res.redirect('back');
          });
     }else{
          return res.status(401).send('unauthorized');
     }
}

module.exports.delete = (req, res)=>{
     return res.send("<h1> Delete User </h1>");
};

// render sign up page
module.exports.signUp = (req, res)=>{
     // if user signed in
     if(req.isAuthenticated()){
          return res.redirect('/users/profile');
     }
     return res.render('user_sign_up.ejs', {
          title: "Codeial|Sign Up"
     });
}

// render sign in page
module.exports.signIn = (req, res)=>{
     // if user signed in
     if(req.isAuthenticated()){
          return res.redirect('/users/profile');
     }
     return res.render('user_sign_in.ejs', {
          title: "Codeial|Sign In"
     });
}

// get sign up data
module.exports.create = (req, res)=>{
     // check cpassword and password
     if(req.body.password != req.body.cpassword){
          res.redirect('back');
     }

     // find user from db
     User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('Error in finding user in siging up!'); return}
        
        if(!user){
         User.create(req.body, function(err, user){
          if(err){console.log('Error in creating user while siging up!'); return}

          return res.redirect('/users/sign-in');
         });
        }else{
          return res.redirect('back');
        }
     });
}

// sign in and create the session
module.exports.createSession = (req, res)=>{
    return res.redirect('/');
}

module.exports.destroySession = (req, res)=>{
     req.logout(function(err) {
          if (err) { return next(err); }
          res.redirect('/');
        });
}