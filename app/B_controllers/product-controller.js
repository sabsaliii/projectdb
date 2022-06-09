const ProductService = require('../C_services/product-service');

module.exports.getProducts = async (req, res) => { //상품 전체 보기
  try {
    const categoryID = req.query.categoryId;
    console.log(categoryID)
    const rows = await ProductService.getProducts(categoryID);
    console.log(':: Controller - getProducts success ::')
    return res.render('all_view', { data: rows });
  } catch (err) {
    return res.status(500).json(err);
  }
}

module.exports.getProductDetail = async (req, res) => { //상품 하나 보기
  try {
    const productID = req.params.productId;
    console.log(productID);
    const row = await ProductService.getProductDetail(productID);
    console.log(':: Controller - getProductDetail success ::')
    return res.render('product_detailed',{ data : row });
  } catch (err) {
    return res.status(500).json(err);
  }
};
