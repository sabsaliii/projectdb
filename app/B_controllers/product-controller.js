const ProductService = require('../C_services/product-service');
const url = require('url');
const {loginState} = require('../middleware/jwt');
const { login } = require('./user-controller');

exports.getProducts = async (req, res) => { //상품 전체 보기
  try {
    const loginstate = loginState(req,res);
    const categoryID = req.query.categoryId;
    // console.log(categoryID)
    const rows = await ProductService.getProducts(categoryID);
    console.log(':: Controller - getProducts success ::')
    return res.render('all_view', { data: rows,login:loginstate });
  } catch (err) {
    return res.status(500).json(err);
  }
}

exports.getProductDetail = async (req, res) => { //상품 하나 보기
  try {
    const loginstate = loginState(req,res);
    const productID = req.params.productId;
    // console.log(productID);
    const row = await ProductService.getProductDetail(productID);
    console.log(':: Controller - getProductDetail success ::')

    //return res.render('product_detailed',{ data : row });
    return res.render('product_detailed2',{ data : row, login:loginstate });
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.search = async (req,res) =>{
  try {
    const loginstate = loginState(req,res);
    const key = url.parse(req.url, true).query.search;
    //console.log(key)
    if(key == ""){
      return res.send('<script>alert("검색할 단어를 입력해주세요.");location.href="/allProduct";</script>');
    }
    const rows = await ProductService.search(key);
    console.log(':: Controller - search success ::')
    return res.render('product-search',{ data : rows ,login:loginstate});
  } catch (err) {
    return res.status(500).json(err);
  }
}