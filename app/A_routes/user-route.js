const methodOverride=require('method-override');
const bodyParser=require('body-parser');
const UserController = require('../B_controllers/user-controller');

module.exports=router=>{
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({extended: true}));
    router.use(methodOverride('_method'));

    router.get('/loginform',UserController.getLoginPage);
    router.post('/login',UserController.login);

    router.post('/order/:productId',UserController.order);
}