const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
oracledb.autoCommit = true
oracledb.initOracleClient({ libDir: 'C"\\instantclient_21_3' });

const dbConfig = require('../F_config/DBconfig.json');

async function init() {
   
    try {
        await oracledb.createPool({
        user          : dbConfig.user,
        password      : dbConfig.password,               // mypw contains the hr schema password
        connectString : dbConfig.connectString,
        poolAlias: 'ys'
      });
      console('pool.js')
     // const connect = oracledb.getConnection('hrpool')
    } catch (err) {
      console.error("init() error: " + err.message);
    }
  }

  init();
module.exports.init;  
