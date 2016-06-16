module.exports = Object.assign( { }, require('./__proto__'), {

    Context: Object.create( Object.assign( require('./_util/Context'), {
        POST( resource ) {
            return new Promise( ( resolve, reject ) => {
                if( ! resource.user.token ) reject('Give me the token')
                resource.body.token = resource.user.token
                resolve()
            } )
        }
    } ) )

} )
