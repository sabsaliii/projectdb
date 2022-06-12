const query = require('../D_queries/admin-query')
const pool = require('oracledb');


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
exports.getWarehouses = async () => {
    try {
        let connection = await pool.getConnection('ys');
        const data = await connection.execute(query.getWarehouses);
        console.log(':: Service - getWarehouses success ::')
        console.log(data.rows[1])
        await connection.close()
        return data.rows;
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
};
exports.getWarehouse = async (warehouseID) => {
    try{
        let connection = await pool.getConnection('ys');
        const data = await connection.execute(query.getWarehouse,[warehouseID]);
        console.log(':: Service - getWarehouse success ::')
        console.log(data.rows[0])
        await connection.close()
        return data.rows;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}
exports.getBranches = async (warehouseID) => {
    try {
        let connection = await pool.getConnection('ys');
        let data;
        if(warehouseID == null) {
            data = await connection.execute(query.getBranches);
        }
        else {
            data = await connection.execute(query.getBranches_category, [warehouseID]);
        }
        
        console.log(':: Service - getBranches success ::')
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
};
exports.getBranch = async (customerID) => {
    try{
        let connection = await pool.getConnection('ys');
        const data = await connection.execute(query.getBranch,[customerID]);
        console.log(':: Service - getBranch success ::')
        console.log(data.rows)
        await connection.close()
        return data.rows[0];
    }catch(err){
        console.log(err);
        throw Error(err);
    }
};
