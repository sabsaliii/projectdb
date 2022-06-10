const express = require('express')
const app = express()


const server = app.listen(3000, () => {
    console.log('server start, port 3000')
})

const oracledb = require('oracledb')
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT


app.get('/select/:productId', function(request, response) {
    productId = request.params;
    console.log(productId)

    getSelect(request, response);
    //response.sendFile(__dirname + "/product_detail.html")
})

async function getSelect(request, response) {
    //console.log(request.params.productId);      // 받는 product_id - select에서 where에 사용할것임

    let connection
    try {
        connection = await oracledb.getConnection({
            user          : "db201911656",
            password      : "201911656",
            connectString : "203.247.166.94:1521/xe"
        })

        const result = await connection.execute(
            'SELECT PRODUCT_NAME, DESCRIPTION, LIST_PRICE FROM PRODUCTS WHERE PRODUCT_ID = :num',
            [request.params.productId], // num의 값 전달    - 앞 html에서 받아오는 product_id
        )

        console.log(result)
        response.send(result.rows)
    } catch (error) {
        console.log(error)
    } finally {
        if (connection) {
            try {
                await connection.close()
            } catch (error) {
                console.log(error)
            }
        }
    }
}

oracledb.initOracleClient({ libDir: 'instantclient_21_3' });