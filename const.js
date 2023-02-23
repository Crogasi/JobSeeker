( function ( global ) {
    'use strict';
    
    var constants = {}
    
    //postGreSQL
    constants.databaseURL = process.env.DATABASE_URL || "localhost"
    constants.databasePort = process.env.DATABASE_PORT || "5432"
    constants.databaseName = process.env.DATABASE_NAME || "JobSeeker"
    constants.databaseUser = process.env.DATABASE_USER || "postgres"
    constants.databasePassword = process.env.DATABASE_PASSWORD || "paramadaksa"

    //Server
    constants.serverPort = process.env.PORT || 3000
    constants.serverURL = process.env.URL || "localhost"

    constants.secretKey = "secretKey"
    constants.jobListURL= "http://dev3.dansmultipro.co.id/api/recruitment/positions.json"
    constants.jobByIDURL= "http://dev3.dansmultipro.co.id/api/recruitment/positions/"
    module.exports = constants
})((this || 0).self || global);