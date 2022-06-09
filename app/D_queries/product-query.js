exports.getProducts = 'select * from products';
exports.getProducts_category = 'select product_id, product_name, category_name from products natural join product_categories where category_id = :num';
exports.getProductDetail = 'select * from products where product_id = :num';