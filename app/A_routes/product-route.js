const methodOverride=require('method-override');
const bodyParser=require('body-parser');
const ProductController = require('../B_controllers/product-controller');



module.exports=router=>{
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({extended: true}));
    router.use(methodOverride('_method'));

    router.get('/allProduct',ProductController.getProducts);
    router.get('/productDetail/:productId',ProductController.getProductDetail);

    router.get('/search',ProductController.search);

}