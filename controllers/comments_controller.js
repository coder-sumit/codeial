const comment = require('../models/comment');
const post = require('../models/post');
module.exports.create = async function(req, res){
    try{
        // find post
        let myPost = await post.findById(req.body.post);
        if(myPost){
            let myComment = await comment.create({
                content: req.body.comment,
                post: myPost._id,
                user: req.user._id
            });
            // save comment to post
            myPost.comments.push(myComment._id);
            myPost.save();
            req.flash('success', 'commented!');
            return res.redirect('back');
        }else{
            req.flash('error', 'Error while commenting');
            return res.redirect('back');
        }
    }catch(err){
        console.log("Error", err);
    }
}

module.exports.destroy = async function(req, res){
   try{
    let id = req.params.id;
    let myComment = await comment.findById(id).populate('post');
    console.log(myComment.post);
    if(myComment){
        if(myComment.user == req.user.id || myComment.post.user == req.user.id){
                let postId = myComment.post.id;
                myComment.remove();
                await post.findByIdAndUpdate(postId, {$pull: {comments: id}});
            req.flash('error', 'comment got deleted!');
            return res.redirect('back');
            }else{
            req.flash('error', 'you are not authorized');
                return res.send("Not Authorized");
            }
        }else{
            req.flash('error', 'comment not found!');
            return res.send("Comment not Found");
        }
   }catch(err){
    console.log('Error', err);
   }
}