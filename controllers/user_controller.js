module.exports.profile = function(req, res){
     return res.send("<h1> User Profile </h1>");
};

module.exports.delete = (req, res)=>{
     return res.send("<h1> Delete User </h1>");
};