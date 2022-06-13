const methodOverride=require('method-override');
const bodyParser=require('body-parser');
const AdminController = require('../B_controllers/admin-controller');
const MiddleWare = require('../middleware/jwt');

module.exports=router=>{
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({extended: true}));
    router.use(methodOverride('_method'));

    router.get('/admin',MiddleWare.authenticate,AdminController.getCustomers);
    router.get('/admin/customerDetail/:contactId',MiddleWare.authenticate,AdminController.getCustomer);
    router.get('/admin_warehouse',AdminController.getWarehouses);
    router.get('/warehouseDetail/:warehouseId',AdminController.getWarehouse);
    router.get('/admin_branch',AdminController.getBranches);
    router.get('/branchDetail/:customerId',AdminController.getBranch);

    router.get('/admin/orders',AdminController.getOrders);

};