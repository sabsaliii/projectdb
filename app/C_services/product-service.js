const query = require('../D_queries/product-query');
const pool = require('oracledb');

<<<<<<< HEAD
exports.getProducts = async (id) => {
    try {
        let connection = await pool.getConnection('ys');
        const data = await connection.execute(query.getProducts);
        if(id>=1) {
            data = await connection.execute(query.getProducts, [id]);
        }
=======
exports.getProducts = async (categoryID) => {
    try {
        let connection = await pool.getConnection('ys');
        let data
        if(categoryID == null){
            data = await connection.execute(query.getProducts);
        }else{
            data = await connection.execute(query.getProducts_category,[categoryID]);
        }
        
>>>>>>> fccfaf99f1bc3fd0d8b33d204b4e27c208f66cf8
        console.log(':: Service - getProducts success ::')
        //console.log(data.rows)
        await connection.close()
        return data.rows;
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
};
<<<<<<< HEAD

=======
>>>>>>> fccfaf99f1bc3fd0d8b33d204b4e27c208f66cf8
exports.getProductDetail = async (productID) => {
    try {
        let connection = await pool.getConnection('ys');
        const data = await connection.execute(query.getProductDetail,[productID]);
        console.log(':: Service - getProductDetail success ::')
<<<<<<< HEAD
        console.log(data.rows[0])
=======
        // console.log(data.rows[0])
>>>>>>> fccfaf99f1bc3fd0d8b33d204b4e27c208f66cf8
        await connection.close()
        return data.rows[0];
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
};
<<<<<<< HEAD
=======

exports.search = async (key) => {
    try {
        let connection = await pool.getConnection('ys');
        key = '%'+key+'%';
        const lowerKey = key.toUpperCase();
        const upperKey =key.toLowerCase();
        // console.log(lowerKey,upperKey);
        const data = await connection.execute(query.search,[key]);
        
        console.log(':: Service - search success ::')
        await connection.close()
        return data.rows;
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
};
>>>>>>> fccfaf99f1bc3fd0d8b33d204b4e27c208f66cf8
