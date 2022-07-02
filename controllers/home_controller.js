module.exports.home = function(req, res){
        return res.render('home',{
                title: 'Home'
        });
};

module.exports.about = (req, res)=>{
        return res.send("<h1> About Us </h1>");
}