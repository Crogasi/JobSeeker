const pool = require( './DBConfig' )
let DBServices = {
    getUser: function ( username, password ) {
        return new Promise( function ( resolve, reject ) {
            pool.query( 'SELECT * FROM users WHERE username = $1 AND password = $2', [ username, password ], ( error, results ) => {
                if ( error ) {
                    console.log(error)
                    reject( error )
                }
                console.log(results)
                resolve( results.rows )
            } )
        } )
    },

    createUser: function ( username, password ) { 
        return new Promise( function ( resolve, reject ) {
            pool.query( 'INSERT INTO users (username, password) VALUES ($1, $2)', [ username, password ], ( error, results ) => {
                if ( error ) {
                    console.log(error)
                    reject( error )
                }
                resolve( results.rows )
            } )
        } )
    }
}

module.exports = DBServices