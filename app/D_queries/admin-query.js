exports.getCustomers = 'select contact_id, first_name, last_name, name from contacts natural join customers';
exports.getCustomer = 'select * from contacts join customers on contacts.customer_id = customers.customer_id left join (orders join (order_items join products on order_items.product_id = products.product_id) on orders.order_id = order_items.order_id) on contacts.customer_id = orders.customer_id where contacts.contact_id = :num';
exports.getWarehouses = 'select * from warehouses';
exports.getWarehouse = 'select * from warehouses join locations on warehouses.location_id = locations.location_id join inventories on warehouses.warehouse_id = inventories.warehouse_id join products on inventories.product_id = products.product_id where warehouses.warehouse_id = :num order by products.product_id';
exports.getBranches = 'select * from customers';
exports.getBranch = 'select * from contacts natural join customers where contact_id = :num';
exports.getBranches_category = 'select * from customers where warehouse_id= :num';

exports.getOrders = 'select * from orders o join order_items oi on o.order_id=oi.order_id join products p on oi.product_id=p.product_id join customers c on c.customer_id= o.customer_id order by o.order_id, oi.item_id';
exports.searchBranch ='select*from customers where (name like :name or LOWER(name) like LOWER(:name) or UPPER(name) like UPPER(:name))';
exports.searchAdmin ='select * from contacts where (first_name like :name or LOWER(first_name) like LOWER(:name) or UPPER(first_name) like UPPER(:name)) or (last_name like :name or LOWER(last_name) like LOWER(:name) or UPPER(last_name) like UPPER(:name))';


exports.getInfo = 'select * from border_order_view natural join products';
exports.getRequestQtt = `select warehouse_id ,product_id, SUM(order_items.quantity)  from order_items left outer join orders on orders.order_id=order_items.order_id and orders.status='Pending' left outer join customers on orders.customer_id=customers.customer_id where warehouse_id = :warehouse_id group by product_id,warehouse_id order by warehouse_id,product_id`;
exports.getWarehouseDetail = 'select* from warehousedetail left join requestquantity on requestquantity.warehouse_id = warehousedetail.warehouse_id and requestquantity.product_id = warehousedetail.product_id where warehousedetail.warehouse_id= :warehouse_id order by warehousedetail.warehouse_id';
// exports.send = 'update ';
exports.borderOrders = `insert into border_orders (product_id,employee_id,quantity,warehouse_id,order_date)values(:product_id,:employee_id,:quantity,:warehouse_id,to_date(:order_date,'YY-MM-DD hh24:mi:ss'))`;

exports.searchPendingOrders = `select * from orders  o join order_items oi on o.order_id=oi.order_id join products p on oi.product_id = p.product_id join customers c on c.customer_id = o.customer_id where status ='Pending' order by o.order_id, oi.item_id`;
exports.searchShippedOrders = `select * from orders  o join order_items oi on o.order_id=oi.order_id join products p on oi.product_id = p.product_id join customers c on c.customer_id = o.customer_id where status ='Shipped' order by o.order_id, oi.item_id`;
exports.searchCanceledOrders =`select * from orders  o join order_items oi on o.order_id=oi.order_id join products p on oi.product_id = p.product_id join customers c on c.customer_id = o.customer_id where status ='Canceled' order by o.order_id, oi.item_id`;


exports.searchPendingInfo = `select * from border_order_view natural join products where status = 'Pending'`;
exports.searchShippedInfo = `select * from border_order_view natural join products where status ='Shipped'`;

exports.searchOption_NotNull = 'select* from warehousedetail left join requestquantity on requestquantity.warehouse_id = warehousedetail.warehouse_id and requestquantity.product_id = warehousedetail.product_id where warehousedetail.warehouse_id= :warehouse_id and total is not null order by warehousedetail.warehouse_id'; 
exports.searchOption_Null = 'select* from warehousedetail left join requestquantity on requestquantity.warehouse_id = warehousedetail.warehouse_id and requestquantity.product_id = warehousedetail.product_id where warehousedetail.warehouse_id= :warehouse_id and total is null order by warehousedetail.warehouse_id'; 

exports.updateProductReady = `update order_items set  ready='true' where (order_id) in (select order_id from orders where (customer_id) in (select customer_id from customers where warehouse_id=:warehouse_id)) and product_id=:product_id`;

exports.orderConfirm = `update orders set status='Shipped' where order_id = :order_id`;
// exports.minusProductQtt = `update inventories set quantity = to_number(inventories.quantity)-to_number(:quantity) where (product_id) in (select product_id from order_items where order_id=:order_id) and warehouse_id=:warehouse_id`;
exports.minusProductQtt = `update view_change_warehouse_qtt set warehouse_qtt = diff where order_id=:order_id and warehouse_id=:warehouse_id`;