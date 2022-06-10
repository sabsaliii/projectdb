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