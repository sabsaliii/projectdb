const http = require('http');
const path = require('path');
const express = require('express');
const cookieParser=require('cookie-parser');
const pool = require('./app/E_database/pool')
const app = express()
// const middleware = require('./app/middleware/jwt');
const {loginState} = require('./app/middleware/jwt');

init = async (req, res) => {
await pool.init;


const server = http.createServer(app);
app.use(express.json());
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');


app.set('views',"./views");
app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res,next)=>{
    const loginstate = loginState(req,res,next);
    console.log(loginstate);
    return res.render('project_main',{login:loginstate})});

require('./app/A_routes/product-route')(app)
require('./app/A_routes/admin-route')(app)
require('./app/A_routes/user-route')(app)

server.listen(3000, ()=>{
    console.log("Server running at http://localhost:3000/");
})
}

init();