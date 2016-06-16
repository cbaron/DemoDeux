module.exports = Object.assign( { }, require('../lib/MyObject'), {

    Postgres: require('../dal/Postgres').REST,

    Context: Object.create( require('./_util/Context') ),
    
    Db: Object.create( require('./_util/Db') ),
    
    Response: Object.create( require('./_util/Response') ),

    Validate: Object.create( require('./_util/Validate') ),

    chains: { },

    createChain( method ) {
        var start = new Promise( resolve => this.start = resolve )
        this.callChain = start.then( () => new Promise( resolve => resolve() ) )

        if( ! this.chains[ method ] ) return this.getDefaultChain( method )

        this.chains[ method ].forEach( fun => this.callChain = this.callChain.then( () => fun.call(this) ) )

        this.start()

        return this
    },

    createCookie() {
        return new Promise( ( resolve, reject ) => {
            require('jws').createSign( {
                header: { "alg": "HS256", "typ": "JWT" },
                payload: JSON.stringify( this.user ),
                privateKey: process.env.JWS_SECRET,
            } )
            .on( 'done', signature => resolve( signature ) )
            .on( 'error', e => { this.user = { }; return resolve() } )
        } )
    },

    end( data ) {
        return new Promise( resolve => {
            data.body = JSON.stringify( data.body )
            this.response.writeHead( data.code || 200, Object.assign( this.getHeaders( data.body ), data.headers || {} ) )
            this.response.end( data.body )
            resolve()
        } )
    },

    getDefaultChain( method ) {

        var start = new Promise( resolve => this.start = resolve )
        this.callChain = start.then( () => new Promise( resolve => resolve() ) )

        this.callChain = this.callChain.then( result => this.Validate.init( this, result ) )
        this.callChain = this.callChain.then( result => this.Context.init( this, result ) )
        this.callChain = this.callChain.then( result => this.Db.init( this, result ) )
        this.callChain = this.callChain.then( result => this.Response.init( this, result ) )

        /*
        [ this.Validate.init, this.Context.init, this.Db.init, this.Response.init ]
            .forEach( fun => this.callChain = this.callChain.then( result => fun( this, result ) ) )
        */
        
        this.start()
         
        return this
    },

    getHeaders( body ) { return Object.assign( {}, this.headers, { 'Date': new Date().toISOString(), 'Content-Length': Buffer.byteLength( body ) } ) },

    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Keep-Alive': 'timeout=50, max=100',
    },

    notFound() { this.respond( { code: 404 } ) },

    oblige( method ) { return this.createChain( method ).callChain },

    respond( data ) {
        if( this.setCookie ) {
            return this.createCookie().then( cookie => {
                data.headers = Object.assign( {}, { 'Set-Cookie': `${process.env.COOKIE}=${cookie}; domain=${process.env.DOMAIN}` }, data.headers || {} )
                this.end(data)
            } )
        }

        return this.end(data)
    }

} )
