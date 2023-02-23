const router = require('express').Router()
const UserService = require( '../service/UserService.js' )
const cnst = require( '../const.js' )
const APIHandler = {
    _init: ( app, express ) => {
        app.use( express.json() )
        app.use( express.urlencoded( { extended: true } ) )

        router.get( '/health', ( _, response ) => {
            response.status( 200 ).json( { message: `Server is up and running @ port${ cnst.serverPort }` } )
        } )

        router.post( '/register', ( request, response ) => {
            UserService.register( request, response )
        } )

        router.post( '/login', ( request, response ) => {
            UserService.login( request, response )
        } )

        router.get( '/job/list', ( request, response ) => {
            UserService.getJob( request, response )
        } ) 
        
        router.get( '/job/detail', ( request, response ) => { 
            UserService.getJobDetail( request, response )
        } )

        app.use( '/', router )

        APIHandler.router = router
    },
    get init () {
        return this._init
    },
    set init ( value ) {
        this._init = value
    },
}

module.exports = APIHandler