const UserService = require('../C_services/user-service')

exports.getLoginPage = async (req,res) =>{
    try{
        return res.render('login');
    }catch(err){
        return res.status(500).json(err);
    }
}

exports.login = async (req,res) =>{
    try{
        console.log(req.body);
        return res.send(req.body);
    }catch(err){
        return res.status(500).json(err);
    }
}