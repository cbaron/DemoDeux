module.exports = Object.create( Object.assign( { }, require('./lib/MyObject'), {
    constructor( app ) {
        this.io = require('socket.io')(app)
        this.io.on( 'connection', socket => {
          socket.on( 'adCreated', ( data, callback ) => {
              this.io.emit( 'adCreated', data )
              callback()
          } )
          socket.on( 'adMatched', ( data, callback ) => {
              this.io.emit( 'adMatched', data )
              callback()
          } )
        } )
    }
} ) )
