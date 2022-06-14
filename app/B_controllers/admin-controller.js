const AdminService = require('../C_services/admin-service')
const url = require('url');
const {getCookiePayload} = require('../middleware/jwt');
const UserService = require('../C_services/user-service');

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
      // console.log(warehouseID)
      const rows = await AdminService.getWarehouse(warehouseID);
      // console.log(rows);
      console.log(':: Controller - getWarehouse success ::')
      return res.render('admin_warehouse_detailed', { data: rows});
     
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
    console.log(rows);
    return res.render('admin_orders',{data:rows});
  }catch (err){
    return res.status(500).json(err);
  }
}
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
module.exports.getInfo = async (req,res)=>{
  try {
      const rows = await AdminService.getInfo();
      console.log(':: Controller - getInfo success ::')
    
      return res.render('info-list', { data: rows });
    } catch (err) {
      return res.status(500).json(err);
    }
}

exports.send = async(req,res) =>{
    try{
      const warehouseID = req.params.warehouseId;
      const productID = req.query.productId;
      console.log(warehouseID,'send',productID);
      await AdminService.send(warehouseID,productID);
    }catch (err){
      return res.status(500).json(err);
    }
  };
  
exports.borderOrders = async (req,res) =>{
    try{
      // console.log(req.body);
      let employeeID;
      const payroad = getCookiePayload(req,res);
      // console.log(payroad);
      if(payroad == -1){
        return res.send('<script>alert("잘못된 접근입니다.");location.href="/";</script>');
      }else {
        employeeID = await UserService.getEmployeeId(payroad);
        // console.log(employeeID);
      }
      const warehouseID = req.body.warehouse_id;
      const result = await AdminService.borderOrders(req.body,employeeID);
      if(result ===1){
        return res.send(`<script>alert("발주완료 되었습니다.");location.href="/warehouseDetail/${warehouseID}";</script>`);
      }else{
        return res.send(`<script>alert("발주실패");location.href="/warehouseDetail/${warehouseID}";</script>`);
      }
    }catch(err){
      return res.status(500).json(err);
    }
  };

exports.searhOptionOrders = async (req,res)=>{
  try{  
    const option = url.parse(req.url, true).query.search_option;
    console.log(option);
    const rows = await AdminService.searchOptionOrders(option);
    return res.render('admin_orders',{data:rows});
  }catch (err){
    return res.status(500).json(err);
  }
}  
exports.searhOptionInfo = async (req,res)=>{
  try{  
    const option = url.parse(req.url, true).query.search_option;
    console.log(option);
    const rows = await AdminService.searhOptionInfo(option);
    return res.render('info-list',{data:rows});
  }catch (err){
    return res.status(500).json(err);
  }
}  

exports.searchOptionWarehouse = async (req,res) => {
  try{
    const option = url.parse(req.url, true).query.search_option;
    console.log(option);
    const warehouseID = req.params.warehouseId;
    console.log(warehouseID)
    const rows = await AdminService.searchOptionWarehouse(warehouseID,option);
    // console.log(rows);
    console.log(':: Controller - getWarehouse success ::');
    return res.render('admin_warehouse_detailed', { data: rows});
  }catch (err){
    return res.status(500).json(err);
  }
}