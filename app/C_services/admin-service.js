const query = require('../D_queries/admin-query')
const pool = require('oracledb');
const { anySeries } = require('async');

exports.getCustomers = async () => {
    try {
        let connection = await pool.getConnection('ys');
        const data = await connection.execute(query.getCustomers);
        console.log(':: Service - getCustomers success ::')
        console.log(data.rows)
        await connection.close()
        return data.rows;
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
};

exports.getCustomer = async (contactID) => {
    try{
        let connection = await pool.getConnection('ys');
        const data = await connection.execute(query.getCustomer,[contactID]);
        console.log(':: Service - getCustomer success ::')
        console.log(data.rows)
        await connection.close()
        return data.rows[0];
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}