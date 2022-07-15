const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
   try{
      await Post.create({
         content: req.body.content,
         user: req.user._id
        });
        req.flash('success', "Post Published!");
        return res.redirect('back');
   }catch(err){
      console.log("Error", err);
   }
}

module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
        // .id means object id is converted into string
        if(post.user == req.user.id){
        post.remove();
        await Comment.deleteMany({post: req.params.id});
        req.flash('error', "Post deleted!");
        return res.redirect('back');
        }else{
       req.flash('error', "You are not autherized");
        return res.redirect('back');
       }
    }catch(err){
      console.log("Error", err);
    }
}