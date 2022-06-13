const AdminService = require('../C_services/admin-service')

module.exports.getCustomers = async (req,res)=>{
    try {
        const rows = await AdminService.getCustomers();
        console.log(':: Controller - getCustomers success ::')
      
        return res.render('admin', { data: rows });
      } catch (err) {
        return res.status(500).json(err);
      }
}
module.exports.getWarehouses = async (req,res)=>{
  try {
      const rows = await AdminService.getWarehouses();
      console.log(':: Controller - getWarehouses success ::')
      return res.render('admin_warehouse', { data: rows });
    } catch (err) {
      return res.status(500).json(err);
    }
}
module.exports.getBranches = async (req,res)=>{
  try {
    const warehouseID = req.query.warehouseId;
      const rows = await AdminService.getBranches(warehouseID);
      console.log(':: Controller - getBranches success ::')
      return res.render('admin_branch', { data: rows });
    } catch (err) {
      return res.status(500).json(err);
    }
}

exports.getCustomer = async (req, res)=>{
    try {
        const contactID = req.params.contactId;
        console.log(contactID)
        const row = await AdminService.getCustomer(contactID);
        console.log(':: Controller - getCustomer success ::')
        return res.render('admin_customer', { data: row });
      } catch (err) {
        return res.status(500).json(err);
      }
};
exports.getWarehouse = async (req, res)=>{
  try {
      const warehouseID = req.params.warehouseId;
      console.log(warehouseID)
      const row = await AdminService.getWarehouse(warehouseID);
      console.log(':: Controller - getWarehouse success ::')
      return res.render('admin_warehouse_detailed', { data: row });
    } catch (err) {
      return res.status(500).json(err);
    }
};
exports.getBranch = async (req, res)=>{
  try {
      const customerID = req.params.customerId;
      console.log(customerID)
      const row = await AdminService.getBranch(customerID);
      console.log(':: Controller - getBranch success ::')
      return res.render('admin_branch_detail', { data: row });
    } catch (err) {
      return res.status(500).json(err);
    }
};

exports.getOrders = async (req,res) =>{
  try{
    const rows = await AdminService.getOrders();
    return res.render('admin_orders',{data:rows});
  }catch (err){
    return res.status(500).json(err);
  }
};