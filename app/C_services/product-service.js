const query = require('../D_queries/product-query');
const pool = require('oracledb');

exports.getProducts = async () => {
    try {
        let connection = await pool.getConnection('ys');
        const data = await connection.execute(query.getProducts);
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
