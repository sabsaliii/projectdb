const UserService = require('../C_services/user-service')
const MiddleWare = require('../middleware/jwt');

exports.getLoginPage = async (req,res) =>{
    try{
        return res.render('login');
    }catch(err){
        return res.status(500).json(err);
    }
}

exports.login = async (req,res) =>{
    try{
        // console.log(req.body);
        const row = await UserService.login(req.body, res);
        if (row == 0){
           const accessToken = MiddleWare.token().access(req.body.user_id);
           const refreshToken = MiddleWare.token().refresh(req.body.user_id);
          
            res.cookie('accessToken',accessToken,{httpOnly :true});
            res.cookie('refreshToken',refreshToken, {httpOnly:true});
           
           return res.send('<script>alert("로그인 성공");location.href="/";</script>'); 
        }else if(row ==-1){
            req.authData = {
                status : 400,
                message : 'Not Correct User Data'
            }
            return res.send('<script>alert("비밀번호가 일치하지 않습니다.");location.href="/loginform";</script>');
        }else{
            return res.send('<script>alert("등록되지 않은 유저입니다.");location.href="/loginform";</script>');
        }
     
    }catch(err){
        return res.status(500).json(err);
    }
}

exports.logout = async (req,res) =>{
    try{
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        return res.send('<script>alert(\'로그아웃되었습니다.\'); location.href="/"</script>');
    }catch (err){
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
