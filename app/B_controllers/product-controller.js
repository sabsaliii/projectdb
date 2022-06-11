const ProductService = require('../C_services/product-service');
const url = require('url');

exports.getProducts = async (req, res) => { //상품 전체 보기
  try {
    const categoryID = req.query.categoryId;
    // console.log(categoryID)
    const rows = await ProductService.getProducts(categoryID);
    console.log(':: Controller - getProducts success ::')
    return res.render('all_view', { data: rows });
  } catch (err) {
    return res.status(500).json(err);
  }
}

exports.getProductDetail = async (req, res) => { //상품 하나 보기
  try {
    const productID = req.params.productId;
    // console.log(productID);
    const row = await ProductService.getProductDetail(productID);
    console.log(':: Controller - getProductDetail success ::')
<<<<<<< HEAD
    return res.render('product_detailed',{ data : row });
=======
    return res.render('product_detailed2',{ data : row });
>>>>>>> e5815aaf48749c682f8a200ba7007b114da3cfbe
  } catch (err) {
    return res.status(500).json(err);
  }
};

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