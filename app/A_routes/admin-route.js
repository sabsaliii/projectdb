const methodOverride=require('method-override');
const bodyParser=require('body-parser');
const AdminController = require('../B_controllers/admin-controller');

module.exports=router=>{
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({extended: true}));
    router.use(methodOverride('_method'));

    router.get('/admin',AdminController.getCustomers);
    router.get('/admin/customerDetail/:contactId',AdminController.getCustomer);
    router.get('/admin_warehouse',AdminController.getWarehouses);
    router.get('/warehouseDetail/:warehouseId',AdminController.getWarehouse);
    router.get('/admin_branch',AdminController.getBranches);
    router.get('/branchDetail/:customerId',AdminController.getBranch);

    router.get('/search_branch',AdminController.searchBranch);
    router.get('/search_admin',AdminController.searchAdmin);

};