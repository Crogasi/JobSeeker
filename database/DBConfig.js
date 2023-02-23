const Pool = require('pg').Pool
const cnst  = require('../const.js')

const pool = new Pool( {
    host: cnst.databaseURL,
    port: cnst.databasePort,
    database: cnst.databaseName,
    user: cnst.databaseUser,
    password: cnst.databasePassword,
} )

module.exports = pool

