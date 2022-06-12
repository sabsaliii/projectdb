exports.getCustomers = 'select contact_id, first_name, last_name, name from contacts natural join customers';
exports.getCustomer = 'select * from contacts join customers on contacts.customer_id = customers.customer_id left join (orders join (order_items join products on order_items.product_id = products.product_id) on orders.order_id = order_items.order_id) on contacts.customer_id = orders.customer_id where contacts.contact_id = :num';
exports.getWarehouses = 'select * from warehouses';
exports.getWarehouse = 'select * from warehouses join locations on warehouses.location_id = locations.location_id join inventories on warehouses.warehouse_id = inventories.warehouse_id join products on inventories.product_id = products.product_id where warehouses.warehouse_id = :num order by products.product_id';
exports.getBranches = 'select * from customers';
exports.getBranch = 'select * from customers where customer_id = :num';
exports.getBranches_category = 'select * from customers where warehouse_id= :num';

exports.searchBranch ='select*from customers where (name like :name or LOWER(name) like LOWER(:name) or UPPER(name) like UPPER(:name))';
exports.searchAdmin ='select * from contacts where (first_name like :name or LOWER(first_name) like LOWER(:name) or UPPER(first_name) like UPPER(:name)) or (last_name like :name or LOWER(last_name) like LOWER(:name) or UPPER(last_name) like UPPER(:name))';