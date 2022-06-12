exports.order = 'insert into orders(order_id, customer_id, status, order_date) values (order_seq.NEXTVAL, :customer_id,:status,:order_date)';
exports.order_item = `insert into order_items(order_id,item_id,product_id,quantity,unit_price) values ((SELECT to_number(LAST_NUMBER) - to_number(1) FROM USER_SEQUENCES WHERE SEQUENCE_NAME = 'ORDER_SEQ'), order_item_seq.NEXTVAL,:product_id,:quantity,:unit_price)`;
exports.findCustomerId = 'select customer_id from customers natural join contacts where name = :name and email = :email' ;
exports.getDate = 'SELECT TO_CHAR(SYSDATE, '+'YY-MM-DD'+') FROM DUAL';        

exports.findEmployeePW = 'select user_password from employees where email = :email';
exports.getSalt = 'select salt from employees where email = :email';