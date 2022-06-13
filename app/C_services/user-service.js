const pool = require('oracledb');
const date = require('date-utils');
const query = require('../D_queries/user-query');
const crypto = require('crypto');

exports.order = async (productID, body) => {
    try {
        let connection = await pool.getConnection('ys');
        var newDate = new Date();
        var order_date = newDate.toFormat('YY-MM-DD');
        console.log(order_date);
        const price = body.price[1];
        const branch_name = body.branch_name;
        const email = body.email;
        const quantity = body.quantity;
        const status = 'Pending';

        const customer = await connection.execute(query.findCustomerId, [branch_name, email]);
        let customerID;
        if (customer.rows.length == 0) {
            return -1;
        } else {
            customerID = customer.rows[0].CUSTOMER_ID;
        }
        const result = await connection.execute(query.order, [customerID, status, order_date]);
        const result2 = await connection.execute(query.order_item, [productID, quantity, price]);
        if (result.rowsAffected && result2.rowsAffected) {
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

exports.login = async (body, res) => {
    try {
        let connection = await pool.getConnection('ys');
        const userID = body.user_id;
        const userPW = body.password;
        const salt = await connection.execute(query.getSalt, [userID]);
        const dbUserPW = await connection.execute(query.findEmployeePW, [userID]);

        if (dbUserPW.rows.length) {
            console.log('등록된 유저 있음');
            const userHashPW = crypto.createHash('sha512').update(userPW + salt.rows[0].SALT).digest('hex');
            if (dbUserPW.rows[0].USER_PASSWORD == userHashPW) {
                console.log('비밀번호 일치');
                const jobTitle = await connection.execute(query.getJobTitle,[userID]);
                // console.log(jobTitle);
                const role = await checkRole(jobTitle.rows[0].JOB_TITLE);
                console.log(role);
                return role;
            } else {
                console.log('비밀번호 불일치');
                return -1;
            }
        } else {
            console.log('등록된 유저 없음');
            return -2;
        }

    } catch (err) {
        console.log(err);
        throw Error(err);
    }
};

checkRole = async (jobTitle) =>{
 try{
    console.log(jobTitle);
    if(jobTitle ==='President' || jobTitle ==='Administration Assistant'||jobTitle==='Administration Vice President'){
        return 'admin';
    }else{
        return 'employee';
    }
 }  catch(err){
    console.log(err);
    throw Error(err);
 } 
}

exports.getEmployeeId = async (email) =>{
        try{
            let connection = await pool.getConnection('ys');
            
            const employeeID = await connection.execute(query.getEmployeeId, [email]);
            console.log(':: Service - getEmployeeId success ::')
            return employeeID.rows[0].EMPLOYEE_ID;
        }catch (err){
            console.log(err);
            throw Error(err);
        }
};