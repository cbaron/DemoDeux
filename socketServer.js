module.exports = Object.create( Object.assign( { }, require('./lib/MyObject'), {
    constructor( app ) {
        this.io = require('socket.io')(app)
        this.io.on( 'connection', socket => {
          socket.on( 'adCreated', ( data, callback ) => {
              console.log("ad created!")
              this.io.emit( 'adCreated', data )
              callback()
          } )
        } )
    }
} ) )
