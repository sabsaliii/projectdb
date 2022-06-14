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
    // console.log(rows);
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

exports.updateProductReady = async(req,res) =>{ //주문상품 준비상태 업뎃
    try{
      const warehouseID = req.params.warehouseId;
      const productID = req.query.productId;
      console.log(warehouseID,'send',productID);
      // product_id 필요함 
      // waerehouse_id 로 order_id를 알아내려면...???
      //어케함..? 해당 warehouse_id가진 customer_id알아낸후 
      //orders에서 해당 customer_id 인 부분의
      //order_items ready를 true로
      const row = await AdminService.updateProductReady(warehouseID,productID);
      if(row == 0){
        return res.send(`<script>alert("해당 제품의 주문 내역이 없습니다.");location.href="/warehouseDetail/${warehouseID}";</script>`);
      }else{
        return res.send(`<script>alert("해당 제품의 준비상태를 업데이트하였습니다.");location.href="/warehouseDetail/${warehouseID}";</script>`);
      }

    }catch (err){
      return res.status(500).json(err);
    }
  };
  
exports.borderOrders = async (req,res) =>{ //발주하기 border_orders테이블에 내용저장
    try{
      console.log(req.body);
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

exports.searhOptionOrders = async (req,res)=>{ //배송 status 별 보기
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

exports.searchOptionWarehouse = async (req,res) => { // 창고 재고 보여줄때 주문 요청재고 유무로 보여주기
  try{
    const option = url.parse(req.url, true).query.search_option;
    console.log(option);
    const warehouseID = req.params.warehouseId;
    console.log(warehouseID)
    const rows = await AdminService.searchOptionWarehouse(warehouseID,option);
    // console.log(rows);
    console.log(':: Controller - searchOptionWarehouse success ::');
    return res.render('admin_warehouse_detailed', { data: rows});
  }catch (err){
    return res.status(500).json(err);
  }
}

exports.orderConfirm = async (req,res)=>{ //주문확정
  try{
    
    const orderID = req.body.order_id;
    const row = await AdminService.orderConfirm(orderID);
    console.log(':: Controller - orderConfirm success ::');
    //product_id warehouse_id 필요
    //order_id로 product_id quantity set 받아온후 inventories 에서 수량-1
    //
    console.log(req.body);
    const row2 = await AdminService.minusProductQtt(req.body);
    
    if(row == 0){
      return res.send(`<script>alert("실패");location.href="/admin/orders";</script>`);
    }else if (row2==0){
      return res.send(`<script>alert("재고부족");location.href="/admin/orders";</script>`);
    }
    else{
      return res.send(`<script>alert("해당 주문건의 발송상태를 업데이트하였습니다.");location.href="/admin/orders";</script>`);
    }

  }catch (err){
    return res.status(500).json(err);
  }
}