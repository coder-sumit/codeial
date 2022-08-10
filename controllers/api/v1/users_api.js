const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async (req, res)=>{
    try{
        let user = await User.findOne({email: req.body.email});
        console.log(req.body);
        if(!user || user.password != req.body.password){
             return res.json(422, {
                message: "Invalid Credentials"
             })
        }else{
            return res.json(200, {
                message: 'Sign in successful, here is your token please keep it safe',
                data: {
                 token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: '1000000'})
                }
            })
        }

    }catch(err){
        console.log("****err", err);
        return res.json(500, {
            message: "Internal Server Error!"
        });
    }
}