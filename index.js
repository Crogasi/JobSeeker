const express = require( 'express' )
const app = express()
const cnst = require('./const.js')
const port = cnst.serverPort
const APIHandler = require( './API/APIHandler.js' )

app.listen( port, () => { 
    APIHandler.init( app, express )
})