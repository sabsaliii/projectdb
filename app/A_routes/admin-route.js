const methodOverride=require('method-override');
const bodyParser=require('body-parser');
const AdminController = require('../B_controllers/admin-controller');

module.exports=router=>{
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({extended: true}));
    router.use(methodOverride('_method'));

    router.get('/admin',AdminController.getCustomers);
    router.get('/admin/customerDetail/:contactId',AdminController.getCustomer);
    

}