const query = require('../D_queries/product-query');
const pool = require('oracledb');

exports.getProducts = async (categoryID) => {
    try {
        let connection = await pool.getConnection('ys');
        let data
        if(categoryID == null){
            data = await connection.execute(query.getProducts);
        }else{
            data = await connection.execute(query.getProducts_category,[categoryID]);
        }
        
        console.log(':: Service - getProducts success ::')
        //console.log(data.rows)
        await connection.close()
        return data.rows;
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
};
exports.getProductDetail = async (productID) => {
    try {
        let connection = await pool.getConnection('ys');
        const data = await connection.execute(query.getProductDetail,[productID]);
        console.log(':: Service - getProductDetail success ::')
        console.log(data.rows[0])
        await connection.close()
        return data.rows[0];
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
};

exports.search = async (key) => {
    try {
        let connection = await pool.getConnection('ys');
        key = '%'+key+'%';
        //console.log(key);
        const lowerKey = key.toUpperCase();
        const upperKey =key.toLowerCase();
        //console.log(lowerKey,upperKey);
        const data = await connection.execute(query.search,[key]);
        
        console.log(':: Service - search success ::')
        await connection.close()
        return data.rows;
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
};