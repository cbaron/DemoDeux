module.exports = Object.assign( {}, require('./__proto__'), {

    template: require('./templates/confirm'),

    validate() {
        return new Promise( ( resolve, reject ) => resolve(true) )
    }
    
} )
