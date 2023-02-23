const cnst = require( '../const.js' )
const DBServices = require( '../database/DBServices.js' )
const JWT = require( 'jsonwebtoken' )
const RESTClient = require( 'node-rest-client' ).Client
const UserService = {
    login: function (request, response ) { 
        let username = request.body.username
        let password = request.body.password
        DBServices.getUser( username, password ).then( result => {
            JWT.sign( { username: username }, cnst.secretKey, { expiresIn: '24h' }, ( error, token ) => {
                if ( error ) {
                    response.status( 500 ).json( { error: error } )
                }
                response.status( 200 ).json( { token: token } )
            } )
        } ).catch(error=>{ 
            response.status( 500 ).json( { error: error } )
        })
    },

    register: function ( request, response ) {
        let username = request.body.username
        let password = request.body.password
        DBServices.createUser( username, password ).then( result => {
            response.status( 200 ).json( { message: 'User created' } )
        } ).catch( error => {
            console.log(error)
            response.status( 500 ).json( { error: error } )
        } )    
    },

    getJob: function ( request, response ) { 
        let token = request.headers.authorization
        JWT.verify( token, cnst.secretKey, ( error, decoded ) => { 
            if( error ) { 
                response.status( 401 ).json( { error: error } )
                return
            }
            
            let description = request.query.description || ""
            let location = request.query.location || ""
            let full_time = request.query.full_time || "true"
            let page = request.query.page || 1
            let size = request.query.size || 0
            full_time.toLowerCase()
            description.toLowerCase()
            location.toLowerCase()
            let type = "full time"

            let client = new RESTClient( {
                connection: {
                    rejectUnauthorized: false
                }
            })
            client.get( cnst.jobListURL, ( data ) => {
                let jobdata = data.filter( job => {
                    let dataDescription = job.description.toLowerCase()
                    let dataLocation = job.location.toLowerCase()
                    
                    if ( dataDescription.includes( description ) && dataLocation.includes( location ) ) {
                        return true
                    }
                } )
                let dataType
                if ( full_time=="true" ) { 
                    jobdata = jobdata.filter( job => { 
                        dataType = job.type.toLowerCase()
                        if ( dataType.includes( type ) ) {
                            return true
                        }
                    } )
                } else {
                    jobdata = jobdata.filter( job => { 
                        dataType = job.type.toLowerCase()
                        if ( !dataType.includes( type ) ) {
                            return true
                        }
                    } )
                }

                let start = ( page - 1 ) * size
                let end = page * size
                if ( size == 0 ) {
                    end = jobdata.length 
                }
                let result = jobdata.slice( start, end )

                response.status( 200 ).json( result )
            })
        })
    },

    getJobDetail: function ( request, response ) { 
        let token = request.headers.authorization
        JWT.verify( token, cnst.secretKey, ( error, decoded ) => { 
            if( error ) { 
                response.status( 401 ).json( { error: error } )
                return
            }

            let id = request.query.id
            let client = new RESTClient( {
                connection: {
                    rejectUnauthorized: false
                }
            })
            client.get( cnst.jobByIDURL+id, ( data ) => {
                response.status( 200 ).json( data )
            })
        })
    },

}

module.exports = UserService