const pool = require('oracledb');
const date = require('date-utils');
const query = require('../D_queries/user-query');

exports.order = async (productID,body) => {
    try {
        let connection = await pool.getConnection('ys');
        let connection2 = await pool.getConnection('ys');
        let connection3 = await pool.getConnection('ys');
        
        // const order_date = await connection3.execute(query.getDate);
        var newDate = new Date();
        var order_date = newDate.toFormat('YY-MM-DD');
        console.log(order_date);
        const price = body.price[1];
        // console.log(price);
        const branch_name = body.branch_name;
        const email = body.email;
        const quantity = body.quantity;
        const status ='Pending';
        // console.log(order_date.rows[0].SYSDATE);
        const customer = await connection.execute(query.findCustomerId,[branch_name,email]);
        console.log(customer.rows.length);
        let customerID;
        // console.log(customerID);
        if(customer.rows.length == 0){
            return -1;
        }else{
            customerID = customer.rows[0].CUSTOMER_ID;
        }
        const result = await connection.execute(query.order,[customerID,status,order_date]);
        console.log(result);
        const result2 =await connection.execute(query.order_item,[productID,quantity,price]);
        console.log(result2.rowsAffected);
        if(result.rowsAffected && result2.rowsAffected){
            console.log(':: Service - order success ::');
            return 1;
        }
        
        await connection.close()
        return 0;
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
};