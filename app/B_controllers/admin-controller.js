const AdminService = require('../C_services/admin-service')
const url = require('url');

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
exports.searchBranch = async (req,res) =>{
  try {

    console.log(url.parse(req.url, true).query);
    const key = url.parse(req.url, true).query.search;
    console.log(key)
    if(key == ""){
      return res.send('<script>alert("검색할 단어를 입력해주세요.");location.href="/admin_branch";</script>');
    }
    const rows = await AdminService.searchBranch(key);
    console.log(':: Controller - searchBranch success ::')
    return res.render('branch_search',{ data : rows });
  } catch (err) {
    return res.status(500).json(err);
  }
};
exports.searchAdmin = async (req,res) =>{
  try {
    const key = url.parse(req.url, true).query.search;
    console.log(key)
    if(key == ""){
      return res.send('<script>alert("검색할 단어를 입력해주세요.");location.href="/admin";</script>');
    }
    const rows = await AdminService.searchAdmin(key);
    console.log(':: Controller - searchAdmin success ::')
    return res.render('admin_search',{ data : rows });
  } catch (err) {
    return res.status(500).json(err);
  }
};