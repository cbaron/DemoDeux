require('./socketServer').constructor( require('http').createServer( require('./router') ).listen( process.env.PORT ) )
