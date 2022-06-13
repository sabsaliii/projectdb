const methodOverride=require('method-override');
const bodyParser=require('body-parser');
const AdminController = require('../B_controllers/admin-controller');
const MiddleWare = require('../middleware/jwt');
const {authAdmin} = require('../middleware/jwt');
const {authEmployee} = require('../middleware/jwt');

module.exports=router=>{
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({extended: true}));
    router.use(methodOverride('_method'));

    router.get('/admin',authEmployee,AdminController.getCustomers);
    router.get('/admin/customerDetail/:contactId',authEmployee,AdminController.getCustomer);
    router.get('/admin_warehouse',authEmployee,AdminController.getWarehouses);
    router.get('/warehouseDetail/:warehouseId',authEmployee,AdminController.getWarehouse);
    router.get('/admin_branch',authEmployee,AdminController.getBranches);
    router.get('/branchDetail/:customerId',authEmployee,AdminController.getBranch);

    router.get('/admin/orders',authEmployee,AdminController.getOrders);
    router.get('/search_branch',authEmployee,AdminController.searchBranch);
    router.get('/search_admin',authEmployee,AdminController.searchAdmin);

    router.get('/admin/send/:warehouseId',authEmployee,AdminController.send);
    router.post('/admin/borderorders',authAdmin,AdminController.borderOrders);

};