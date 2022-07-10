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

module.exports.destroy = function(req, res){
    let id = req.params.id;
    comment.findById(id)
    .populate('post')
    .exec(function(err, comment){
        if(err){return res.send("Error finding in  comment");}
        if(comment){
            
            if(comment.user == req.user.id || comment.post.user == req.user.id){
                let postId = comment.post.id;
                console.log(postId, id, "---");
                comment.remove();
                post.findByIdAndUpdate(postId, {$pull: {comments: id}}, function(err, podt){
                    return res.redirect('back');
                });
            }else{
                return res.send("Not Authorized");
            }
        }else{
            return res.send("Comment not Found");
        }
    });
}