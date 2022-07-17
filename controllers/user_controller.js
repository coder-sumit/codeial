const User = require('../models/user');
const fs = require('fs');
const path = require('path');

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

module.exports.update = async function(req, res){
     try{
          if(req.params.id == req.user.id){
               let user = await User.findByIdAndUpdate(req.params.id);
               User.uploadedAvatar(req, res, function(err){
                    if(err){ console.log('***', err); return;}
                    user.name = req.body.name;
                    user.email = req.body.email;
               // remove file from uploads
               if(req.file){
               if(user.avatar){
               let files = fs.readdirSync(path.join(__dirname, '..', User.avatarPath));
               let isAvailable = false;
               for(file of files){
                    if((User.avatarPath + '/' + file) == user.avatar){
                         isAvailable = true;
                    }
               }
               if(isAvailable){
                   fs.unlinkSync(path.join(__dirname, '..', user.avatar));
               }
               }


                    
               user.avatar = User.avatarPath + '/' + req.file.filename;
                    
          }
                    user.save();
                    return res.redirect('back');
               });
               }else{
                return res.status(401).send('unauthorized');
               }
     }catch(err){
          res.flash('error', err);
          return res.redirect('back');
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
    req.flash('success', "Logged in successfully");
    return res.redirect('/');
}

module.exports.destroySession = (req, res)=>{
     req.logout((err)=>{
          if(err){
          console.log(err);
          return;
          }
     req.flash('success', "You are logged out successfully");
     return res.redirect('/');
     });
     
}