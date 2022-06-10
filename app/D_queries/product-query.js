<<<<<<< HEAD
exports.getProducts = 'select * from products order by product_id desc';
exports.getCategory = 'select * from products where category_id = :num';
exports.getProductDetail = 'select * from products where product_id = :num';
=======
exports.getProducts = 'select * from products';
exports.getProducts_category = 'select product_id, product_name, category_name from products natural join product_categories where category_id = :num';
exports.getProductDetail = 'select * from products where product_id = :num';

 exports.search ='select*from products where (product_name like :product_name or LOWER(product_name) like LOWER(:product_name) or UPPER(product_name) like UPPER(:product_name))';
>>>>>>> fccfaf99f1bc3fd0d8b33d204b4e27c208f66cf8
