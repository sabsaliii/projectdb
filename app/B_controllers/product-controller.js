const ProductService = require('../C_services/product-service');
<<<<<<< HEAD

module.exports.getProducts = async (req, res) => { //상품 전체 보기
  try {
    const id = req.body;
    console.log(id);
    const rows = await ProductService.getProducts(id);
=======
const url = require('url');

exports.getProducts = async (req, res) => { //상품 전체 보기
  try {
    const categoryID = req.query.categoryId;
    // console.log(categoryID)
    const rows = await ProductService.getProducts(categoryID);
>>>>>>> fccfaf99f1bc3fd0d8b33d204b4e27c208f66cf8
    console.log(':: Controller - getProducts success ::')
    return res.render('all_view', { data: rows });
  } catch (err) {
    return res.status(500).json(err);
  }
}

<<<<<<< HEAD
module.exports.getProductDetail = async (req, res) => { //상품 하나 보기
  try {
    const productID = req.params.productId;
    console.log(productID);
=======
exports.getProductDetail = async (req, res) => { //상품 하나 보기
  try {
    const productID = req.params.productId;
    // console.log(productID);
>>>>>>> fccfaf99f1bc3fd0d8b33d204b4e27c208f66cf8
    const row = await ProductService.getProductDetail(productID);
    console.log(':: Controller - getProductDetail success ::')
    return res.render('product_detailed',{ data : row });
  } catch (err) {
    return res.status(500).json(err);
  }
};
<<<<<<< HEAD
=======

exports.search = async (req,res) =>{
  try {
    const key = url.parse(req.url, true).query.search;
    // console.log(key)
    if(key == null){
      return res.send('<script>alert("검색할 단어를 입력해주세요.");location.href="/allProdut";</script>');
    }
    const rows = await ProductService.search(key);
    console.log(':: Controller - search success ::')
    return res.render('product-search',{ data : rows });
  } catch (err) {
    return res.status(500).json(err);
  }
}
>>>>>>> fccfaf99f1bc3fd0d8b33d204b4e27c208f66cf8
