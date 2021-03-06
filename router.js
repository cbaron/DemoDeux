var RESTHandler = {
    condition( request, path ) { return /application\/json/.test( request.headers.accept ) && ( this.routes.REST[ path[1] ] || this.Postgres.tables[ path[1] ] ) },
    method: 'rest'
}

module.exports = Object.create(

    Object.assign( {}, require('./lib/MyObject'), {

        Postgres: require('./dal/Postgres'),

        obligeResource( request, response, path, parsedUrl, dir, file ) {

            return new Promise( ( resolve, reject ) => {

                require('fs').stat( `${__dirname}/${dir}/${file}.js`, err => {
                    if( err ) { 
                        if( err.code !== "ENOENT" ) return reject( err )
                        file = `${dir}/__proto__`
                    }

                    Object.create( require(`${dir}/${file}`), {
                        request: { value: request },
                        response: { value: response },
                        path: { value: path },
                        parsedUrl: { value: parsedUrl },
                        tables: { value: this.Postgres.tables }
                    } ).oblige( request.method ).then( resolve ).catch( reject )
                } )
            } )
        },

        constructor() {
            this.Postgres.getTableData()

            return this.handler.bind(this)
        },
    
        fs: require('fs'),

        handleFailure( response, err, code, log ) {

            var message = ( process.env.NODE_ENV === "production" ) ? "Unknown Error" : err.stack || err.toString()

            if( log ) console.log( err.stack || err )

            response.writeHead( code || 500, {
                "Content-Length": Buffer.byteLength( message ),
                'Content-Type': 'text/plain',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            } )

            response.end( message )
        },

        handler( request, response ) {
            var parsedUrl,
                path,
                routeFound

            if( ! this.resources[ request.method ] ) return this.handleFailure( response, new Error("Not Found"), 404, false )

            request.setEncoding('utf8')

            parsedUrl = require('url').parse( request.url )
            path = parsedUrl.pathname.split("/")

            routeFound = this.resources[ request.method ].find( resource => {
                if( ! resource.condition.call( this, request, path ) ) return false
            
                this[ resource.method ]( request, response, path, parsedUrl )
                .catch( err => this.handleFailure( response, err, 500, true ) )
                return true
            } )

            if( ! routeFound ) return this.handleFailure( response, new Error("Not Found"), 404, false )
        },

        html( request, response, path ) {
            return new Promise( ( resolve, reject ) => {
                response.writeHead( 200 )
                response.end( require('./templates/page')( {
                    isDev: ( process.env.ENV === 'development' ) ? true : false,
                    style: ( request.headers.host.split('.')[0] === 'lovely' ) ? 'lovely' : 'match',
                    title: 'Match Words'
                } ) )
                resolve()
            } )
        },

        resources: {
            "DELETE": [ RESTHandler ],

            "GET": [
                {
                    condition: ( request, path ) => ( path[1] === "static" ) || path[1] === "favicon.ico",
                    method: 'static'
                }, {
                    condition: ( request, path ) => /text\/html/.test( request.headers.accept ),
                    method: 'html'
                },
                RESTHandler
            ],
            
            "PATCH": [ RESTHandler ],

            "POST": [ RESTHandler ],
    
            "PUT": [ RESTHandler ],
        },

        rest( request, response, path, parsedUrl ) { return this.obligeResource( request, response, path, parsedUrl, './resources', path[1] ) },

        static( request, response, path ) {
            var file = this.format( '%s%s', __dirname, path.join('/') )

            return new Promise( ( resolve, reject ) => {
                this.fs.stat( file, ( err, stat ) => {
                    var stream
                    if( err ) { response.writeHead( 404, {} ); response.end(); return resolve() }
                    stream = this.fs.createReadStream( file )
                    response.on( 'error', err => { console.log( err ); stream.end() } )
                    response.writeHead( 200, { 'Connection': 'keep-alive', 'Content-Length': stat.size } )
                    stream.pipe( response )
                    resolve()
                } )
            } )
        }

    } ), { routes: { value: { REST: { user: true } } } }
).constructor()
