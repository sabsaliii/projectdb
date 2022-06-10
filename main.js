const http = require('http');
const path = require('path');
const express = require('express');
const pool = require('./app/E_database/pool');
const { getCategory } = require('./app/D_queries/product-query');
const { getProducts } = require('./app/C_services/product-service');
const app = express()

init = async (req, res) => {
await pool.init;


const server = http.createServer(app);
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.set('views',"./views");
app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>res.render('project_main'));
app.get('/admin',(req,res)=>res.render('admin'));

app.post('/allProduct',(req,res)=> {
    console.log(req.body);
});

app.get('/login',(req,res)=>res.render('login'));


require('./app/A_routes/product-route')(app)

server.listen(3000, ()=>{
    console.log("Server running at http://localhost:3000/");
})
}

init();