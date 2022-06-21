require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.token = () => {
    return {
        access(id,role) {
            return jwt.sign(
                { user_id: id ,user_role:role },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "30m" }
            );
        },
        refresh(id,role) {
            return jwt.sign(
                { user_id: id,user_role:role },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: "30days" }
            );
        },
    }
}

exports.authenticate = (req, res, next) => {
    try {

        if (!req.cookies.accessToken && !req.cookies.refreshToken) {
            return res.send('<script>alert(\'접근권한이 없습니다.\');location.href="/loginform"</script>');
        }

        let accessToken;
        accessToken = req.cookies.accessToken;
        let user;
        try {
            user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
           // res.render('nav',{login:true});
        } catch (err) {
            try {
                const refreshToken = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET);
                console.log(refreshToken.user_id);
                accessToken = this.token().access(refreshToken.user_id);
                res.cookie('accessToken', accessToken); //accessToken 업뎃 시켜주어서 자동로그인됨. (refresh토큰이 유효한 동안)

                return res.send('<script>location.reload();</script>');
            } catch (err2) {
               // res.render('nav',{login:false})
                res.clearCookie('refreshToken');
                res.clearCookie('accessToken');
                return res.send('<script>alert(\'로그인 시간제한이 만료되었습니다.\'); location.href="/"</script>');
            }
        }

        req.payload = user;
        // console.log('middle ware :: ', req.payload);

        next();
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.authAdmin = (req, res, next) => {
    try {

        if (!req.cookies.accessToken && !req.cookies.refreshToken) {
            return res.send('<script>alert(\'접근권한이 없습니다.\');location.href="/loginform"</script>');
        }

        let accessToken;
        accessToken = req.cookies.accessToken;
        let user;
        try {
            user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
           // res.render('nav',{login:true});
           if(user.user_role != 'admin'){
            return res.send('<script>alert(\'접근 권한이 없습니다.\'); location.href="/"</script>');
           }
        } catch (err) {
            try {
                const refreshToken = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET);
                console.log(refreshToken.user_id);
                accessToken = this.token().access(refreshToken.user_id,refreshToken.user_role);
                res.cookie('accessToken', accessToken); //accessToken 업뎃 시켜주어서 자동로그인됨. (refresh토큰이 유효한 동안)

                return res.send('<script>location.reload();</script>');
            } catch (err2) {
               // res.render('nav',{login:false})
                res.clearCookie('refreshToken');
                res.clearCookie('accessToken');
                return res.send('<script>alert(\'로그인 시간제한이 만료되었습니다.\'); location.href="/"</script>');
            }
        }

        req.payload = user;
        // console.log('middle ware :: ', req.payload);

        next();
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.authEmployee = (req, res, next) => {
    try {

        if (!req.cookies.accessToken && !req.cookies.refreshToken) {
            return res.send('<script>alert(\'접근권한이 없습니다.\');location.href="/loginform"</script>');
        }

        let accessToken;
        accessToken = req.cookies.accessToken;
        let user;
        try {
            user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
           // res.render('nav',{login:true});
           console.log(user.user_role);
           if((user.user_role != 'admin')&&(user.user_role != 'employee')){
            return res.send('<script>alert(\'접근 권한이 없습니다.\'); location.href="/"</script>');
           }
        } catch (err) {
            try {
                const refreshToken = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET);
                // console.log(refreshToken.user_id);
                accessToken = this.token().access(refreshToken.user_id,refreshToken.user_role);
                res.cookie('accessToken', accessToken); //accessToken 업뎃 시켜주어서 자동로그인됨. (refresh토큰이 유효한 동안)

                return res.send('<script>location.reload();</script>');
            } catch (err2) {
               // res.render('nav',{login:false})
                res.clearCookie('refreshToken');
                res.clearCookie('accessToken');
                return res.send('<script>alert(\'로그인 시간제한이 만료되었습니다.\'); location.href="/"</script>');
            }
        }

        req.payload = user;
        // console.log('middle ware :: ', req.payload);

        next();
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.loginState = (req,res,next)=>{
    try{
        console.log('loginState!!');
        if (req.cookies.accessToken && req.cookies.refreshToken) {
            return true;
        }else{
            return false;
        }
    }catch (err){
        return res.send(500).json(err);
    }
}

exports.getCookiePayload =(req,res)=>{
        try{
            const accessToken = jwt.verify( req.cookies.accessToken, process.env.ACCESS_TOKEN_SECRET);
            const refreshToken = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET);
            // console.log(refreshToken.user_id,accessToken.user_id);
            if(refreshToken.user_id === accessToken.user_id){
                return accessToken.user_id;
            }else{
                return -1;
            }
        }catch (err){
            return res.send('<script>alert(\'잘못된 접근입니다.\'); location.href="/"</script>');
        }
};
