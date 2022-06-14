const query = require('../D_queries/admin-query')
const pool = require('oracledb');


exports.getCustomers = async () => {
    try {
        let connection = await pool.getConnection('ys');
        const data = await connection.execute(query.getCustomers);
        console.log(':: Service - getCustomers success ::')
        // console.log(data.rows)
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
    try {
        let connection = await pool.getConnection('ys');
        // const data = await connection.execute(query.getWarehouse,[warehouseID]);
        const data = await connection.execute(query.getWarehouseDetail, [warehouseID]);
        console.log(':: Service - getWarehouse success ::')
        // console.log(data.rows[0]);
        // console.log(data.rows);
        await connection.close();
        return data.rows;
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
}
exports.getBranches = async (warehouseID) => {
    try {
        let connection = await pool.getConnection('ys');
        let data;
        if (warehouseID == null) {
            data = await connection.execute(query.getBranches);
        }
        else {
            data = await connection.execute(query.getBranches_category, [warehouseID]);
        }

        console.log(':: Service - getBranches success ::')
        //console.log(data.rows)
        await connection.close()
        return data.rows;
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
};

exports.getCustomer = async (contactID) => {
    try {
        let connection = await pool.getConnection('ys');
        const data = await connection.execute(query.getCustomer, [contactID]);
        console.log(':: Service - getCustomer success ::')
        console.log(data.rows)
        await connection.close()
        return data.rows;
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
};
exports.getBranch = async (customerID) => {
    try {
        let connection = await pool.getConnection('ys');
        const data = await connection.execute(query.getBranch, [customerID]);
        console.log(':: Service - getBranch success ::')
        console.log(data.rows)
        await connection.close()
        return data.rows[0];
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
};

exports.getOrders = async () => {
    try {
        let connection = await pool.getConnection('ys');
        const data = await connection.execute(query.getOrders);
        console.log(':: Service - getOrders success ::')
        // console.log(data.rows)
        await connection.close()
        return data.rows;
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
}
exports.searchBranch = async (key) => {
    try {
        let connection = await pool.getConnection('ys');
        key = '%' + key + '%';
        const lowerKey = key.toUpperCase();
        const upperKey = key.toLowerCase();
        // console.log(lowerKey,upperKey);
        const data = await connection.execute(query.searchBranch, [key]);

        console.log(':: Service - searchBranch success ::')
        await connection.close()
        return data.rows;
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
};
exports.searchAdmin = async (key) => {
    try {
        let connection = await pool.getConnection('ys');
        key = '%' + key + '%';
        const lowerKey = key.toUpperCase();
        const upperKey = key.toLowerCase();
        //console.log(lowerKey,upperKey);
        const data = await connection.execute(query.searchAdmin, [key]);

        console.log(':: Service - searchAdmin success ::')
        await connection.close()
        return data.rows;
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
};
exports.getInfo = async () => {
    try {
        let connection = await pool.getConnection('ys');
        const data = await connection.execute(query.getInfo);
        console.log(':: Service - getInfo success ::')
        // console.log(data.rows)
        await connection.close()
        return data.rows;
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
};

exports.send = async (warehouseID, productID) => {
    try {
        // console.log(warehouseID,productID);
        // console.log(':: Service - send success ::');
        // let connection = await pool.getConnection('ys');

        // const data = await connection.execute(query.send,[warehouseID,productID]);
        // console.log(data);

        // await connection.close()
        // return data;
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
};

exports.borderOrders = async (body, employeeID) => {
    try {
        let connection = await pool.getConnection('ys');
        const warehouseID = body.warehouse_id;
        const productID = body.product_id;
        const quantity = body.quantity;
        const newDate = new Date();
        const orderDate = newDate.toFormat('YY-MM-DD HH:MM:SS');
        // console.log(employeeID, warehouseID, quantity,productID,orderDate);
        const data = await connection.execute(query.borderOrders, [productID, employeeID, quantity, warehouseID, orderDate]);
        // console.log(data);
        if (data.rowsAffected === 1) {
            console.log(':: Service - borderorder success ::')
            await connection.close();
            return 1;
        } else {
            return -1;
        }
    } catch (err) {
        console(err);
        throw Error(err);
    }
};

exports.searchOptionOrders = async (option) => {
    try {
        let data;
        let connection = await pool.getConnection('ys');
        if (option === '1') { //pending
            data = await connection.execute(query.searchPendingOrders);

        } else if (option === '2') { //shipped
            data = await connection.execute(query.searchShippedOrders);

        } else if (option === '3') { //canceled
            data = await connection.execute(query.searchCanceledOrders);
        } else {
            //전체나오게
            data = await connection.execute(query.getOrders);
        }
        await connection.close();
        return data.rows;
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
}   
exports.searhOptionInfo = async (option) => {
    try {
        let data;
        let connection = await pool.getConnection('ys');
        if (option === '1') { //pending
            data = await connection.execute(query.searchPendingInfo);

        } else if (option === '2') { //shipped
            data = await connection.execute(query.searchShippedInfo);

        } else {
            //전체나오게
            data = await connection.execute(query.getInfo);
        }
        await connection.close();
        return data.rows;
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
}   
