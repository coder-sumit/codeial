const User = require('../models/user');

module.exports.profile = function(req, res){
     return res.send("<h1> User Profile </h1>");
};

module.exports.delete = (req, res)=>{
     return res.send("<h1> Delete User </h1>");
};

// render sign up page
module.exports.signUp = (req, res)=>{
     return res.render('user_sign_up.ejs', {
          title: "Codeial|Sign Up"
     });
}

// render sign in page
module.exports.signIn = (req, res)=>{
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
     // Todo latter
}