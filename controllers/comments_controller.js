const comment = require('../models/comment');
const post = require('../models/post');
module.exports.create = function(req, res){
    // find post
      post.findById(req.body.post, function(err, post){
         if(err){console.log("Error finding in post"); return;}

         if(post){
            comment.create({
                content: req.body.comment,
                post: post._id,
                user: req.user._id
            }, function(err, comment){
                if(err){console.log("Error creating in comment"); return;};
                
                // save comment to post
                post.comments.push(comment._id);
                post.save();

                res.redirect('back');
            });
         }
      });
}