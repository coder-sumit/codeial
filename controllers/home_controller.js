module.exports.home = function(req, res){
        console.log(req.cookies);
        res.cookie('user_id', 111);

        return res.render('home',{
                title: 'Home'
        });
};

module.exports.about = (req, res)=>{
        return res.send("<h1> About Us </h1>");
}