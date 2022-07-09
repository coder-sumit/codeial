const Post = require('../models/post');

module.exports.create = function(req, res){
   console.log(req.user);
   Post.create({
    content: req.body.content,
    user: req.user._id
   }, function(err){
    if(err){"Error in creating a post"};

    return res.redirect('back');
   });
}