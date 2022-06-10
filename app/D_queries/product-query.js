exports.getProducts = 'select * from products order by product_id desc';
exports.getCategory = 'select * from products where category_id = :num';
exports.getProductDetail = 'select * from products where product_id = :num';