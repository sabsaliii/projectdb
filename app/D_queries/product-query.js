exports.getProducts = 'select * from products';
exports.getProducts_category = 'select product_id, product_name, category_name,category_id from products natural join product_categories where category_id = :num';
exports.getProductDetail = 'select * from products where product_id = :product_id';

 exports.search ='select*from products where (product_name like :product_name or LOWER(product_name) like LOWER(:product_name) or UPPER(product_name) like UPPER(:product_name))';