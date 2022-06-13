exports.getCustomers = 'select contact_id, first_name, last_name, name from contacts natural join customers';
exports.getCustomer = 'select * from contacts natural join customers where contact_id= :num';
exports.getWarehouses = 'select * from warehouses';
exports.getWarehouse = 'select * from warehouses join locations on warehouses.location_id = locations.location_id join inventories on warehouses.warehouse_id = inventories.warehouse_id join products on inventories.product_id = products.product_id where warehouses.warehouse_id = :num order by products.product_id';
exports.getBranches = 'select * from customers';
exports.getBranch = 'select * from customers where customer_id = :num';
exports.getBranches_category = 'select * from customers where warehouse_id= :num';

exports.getOrders = 'select * from orders natural join order_items natural join products natural join customers';