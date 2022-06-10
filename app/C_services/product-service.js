const query = require('../D_queries/product-query');
const pool = require('oracledb');

exports.getProducts = async (id) => {
    try {
        let connection = await pool.getConnection('ys');
        const data = await connection.execute(query.getProducts);
        if(id>=1) {
            data = await connection.execute(query.getProducts, [id]);
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
