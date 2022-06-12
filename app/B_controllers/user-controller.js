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

exports.order = async (req,res) =>{
    try{
        console.log(req.body);
        const productID = req.params.productId;
        const row = await UserService.order(productID,req.body);
        console.log(row);
        if(row == -1){
            return res.send(`<script>alert("지점이 존재하지 않습니다.");location.href="/productDetail/${productID}";</script>`);
        }else if(row == 1){

            return res.send(`<script>alert("주문 완료되었습니다.");location.href="/productDetail/${productID}";</script>`);
        }else{
            return res.send(`<script>alert("주문 실패");location.href="/productDetail/${productID}";</script>`);
        }
       
    }catch(err){
        return res.status(500).json(err);
    }
}